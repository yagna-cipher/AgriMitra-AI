import React, { useState, useEffect } from "react";
import { LanguageCode, FarmReminder, ReminderCategory, FarmerCrop } from "../types";
import {
  getSavedReminders,
  addReminder,
  toggleReminderCompleted,
  deleteReminder
} from "../utils/storage";
import { FEATURES_I18N } from "../i18n/featuresI18n";
import {
  Bell,
  Calendar,
  Clock,
  Plus,
  Trash2,
  CheckCircle2,
  Circle,
  Droplets,
  Sparkles,
  Bug,
  TestTube,
  Wheat,
  SlidersHorizontal,
  AlertCircle,
  BellRing
} from "lucide-react";

interface RemindersViewProps {
  currentLanguage: LanguageCode;
  activeCrops: FarmerCrop[];
}

export const RemindersView: React.FC<RemindersViewProps> = ({
  currentLanguage,
  activeCrops
}) => {
  const i18n = FEATURES_I18N[currentLanguage]?.reminders || FEATURES_I18N.en.reminders;

  const [reminders, setReminders] = useState<FarmReminder[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState<string>("default");

  // Form states
  const [taskName, setTaskName] = useState("");
  const [category, setCategory] = useState<ReminderCategory>("irrigation");
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  });
  const [time, setTime] = useState("07:00");
  const [cropOrField, setCropOrField] = useState(activeCrops[0]?.name || "Rice Field A");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    setReminders(getSavedReminders());

    if ("Notification" in window) {
      try {
        setNotificationPermission(Notification.permission);
      } catch (e) {
        // inside sandbox iframe, might restrict
        setNotificationPermission("unsupported");
      }
    } else {
      setNotificationPermission("unsupported");
    }
  }, []);

  const handleRequestNotification = async () => {
    if ("Notification" in window) {
      try {
        const perm = await Notification.requestPermission();
        setNotificationPermission(perm);
        if (perm === "granted") {
          new Notification("Agri Mitra AI", {
            body: "Farm task alerts enabled! We'll notify you of upcoming crop activities.",
            icon: "/assets/icon.png"
          });
        }
      } catch (e) {
        setNotificationPermission("denied");
      }
    }
  };

  const handleToggle = (id: string) => {
    const updated = toggleReminderCompleted(id);
    setReminders(updated);
  };

  const handleDelete = (id: string) => {
    const updated = deleteReminder(id);
    setReminders(updated);
  };

  const handleCreateReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName.trim()) return;

    const updated = addReminder({
      taskName: taskName.trim(),
      category,
      date,
      time,
      cropOrField,
      notes: notes.trim(),
      isCompleted: false
    });

    setReminders(updated);
    setTaskName("");
    setNotes("");
    setShowAddModal(false);
  };

  const getCategoryIcon = (cat: ReminderCategory) => {
    switch (cat) {
      case "irrigation":
        return <Droplets className="w-4 h-4 text-blue-600" />;
      case "fertilizer":
        return <Sparkles className="w-4 h-4 text-amber-600" />;
      case "spraying":
        return <Bug className="w-4 h-4 text-purple-600" />;
      case "pest_monitoring":
        return <Bug className="w-4 h-4 text-rose-600" />;
      case "soil_testing":
        return <TestTube className="w-4 h-4 text-emerald-600" />;
      case "harvest":
        return <Wheat className="w-4 h-4 text-amber-500" />;
      default:
        return <SlidersHorizontal className="w-4 h-4 text-slate-600" />;
    }
  };

  const todayStr = new Date().toISOString().split("T")[0];
  const tomorrowStr = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  })();

  const todayTasks = reminders.filter((r) => r.date === todayStr);
  const upcomingTasks = reminders.filter((r) => r.date !== todayStr);

  return (
    <div id="reminders-view" className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-emerald-800 rounded-2xl p-5 sm:p-6 text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-emerald-700 border border-emerald-600 text-xs font-semibold text-emerald-100 mb-2">
            <Bell className="w-3.5 h-3.5 text-amber-300" />
            <span>Farm Task Scheduler</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold">{i18n.title}</h1>
          <p className="text-emerald-100/90 text-xs sm:text-sm mt-1 max-w-xl">
            {i18n.subtitle}
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-sm flex items-center justify-center space-x-2 shrink-0 transition"
        >
          <Plus className="w-4 h-4" />
          <span>{i18n.addTask}</span>
        </button>
      </div>

      {/* Browser Notification Status Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center space-x-2 text-slate-600">
          <BellRing className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{i18n.browserNotificationNote}</span>
        </div>
        {notificationPermission === "default" && (
          <button
            onClick={handleRequestNotification}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 shrink-0"
          >
            Enable Browser Alerts
          </button>
        )}
      </div>

      {/* Today's Tasks Section */}
      {todayTasks.length > 0 && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-3 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
            <span>{i18n.todayTasks} ({todayTasks.length})</span>
          </h2>
          <div className="space-y-2.5">
            {todayTasks.map((reminder) => (
              <div
                key={reminder.id}
                className={`bg-white rounded-xl border p-3.5 shadow-2xs flex items-start justify-between transition ${
                  reminder.isCompleted
                    ? "border-slate-200 bg-slate-50/70 opacity-60"
                    : "border-amber-300 bg-amber-50/30"
                }`}
              >
                <div className="flex items-start space-x-3">
                  <button
                    onClick={() => handleToggle(reminder.id)}
                    className="mt-0.5 text-slate-400 hover:text-emerald-600 transition"
                  >
                    {reminder.isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>

                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="p-1 rounded bg-slate-100">
                        {getCategoryIcon(reminder.category)}
                      </span>
                      <h3
                        className={`text-sm font-bold ${
                          reminder.isCompleted
                            ? "line-through text-slate-500"
                            : "text-slate-800"
                        }`}
                      >
                        {reminder.taskName}
                      </h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                        TODAY
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1.5 font-medium">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{reminder.time}</span>
                      </span>
                      <span>•</span>
                      <span>{reminder.cropOrField}</span>
                    </div>

                    {reminder.notes && (
                      <p className="text-xs text-slate-600 mt-2 bg-white/80 p-2 rounded-lg border border-slate-100">
                        {reminder.notes}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(reminder.id)}
                  className="text-slate-400 hover:text-rose-600 p-1 rounded-lg transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Tasks Section */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3 flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-emerald-600" />
          <span>{i18n.upcomingTasks} ({upcomingTasks.length})</span>
        </h2>

        {upcomingTasks.length === 0 && todayTasks.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
            <Bell className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-600">{i18n.noTasksYet}</p>
            <p className="text-xs text-slate-400 mt-1">
              Add reminders for irrigation, fertilizer splits, and pest scouting to keep your farm on schedule.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {upcomingTasks.map((reminder) => {
              const isTomorrow = reminder.date === tomorrowStr;
              return (
                <div
                  key={reminder.id}
                  className={`bg-white rounded-xl border p-3.5 shadow-2xs flex items-start justify-between transition ${
                    reminder.isCompleted
                      ? "border-slate-200 bg-slate-50 opacity-60"
                      : "border-slate-200 hover:border-emerald-300"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <button
                      onClick={() => handleToggle(reminder.id)}
                      className="mt-0.5 text-slate-400 hover:text-emerald-600 transition"
                    >
                      {reminder.isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>

                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="p-1 rounded bg-slate-100">
                          {getCategoryIcon(reminder.category)}
                        </span>
                        <h3
                          className={`text-sm font-bold ${
                            reminder.isCompleted
                              ? "line-through text-slate-500"
                              : "text-slate-800"
                          }`}
                        >
                          {reminder.taskName}
                        </h3>
                        {isTomorrow && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                            TOMORROW
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1.5 font-medium">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{reminder.date}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{reminder.time}</span>
                        </span>
                        <span>•</span>
                        <span>{reminder.cropOrField}</span>
                      </div>

                      {reminder.notes && (
                        <p className="text-xs text-slate-600 mt-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                          {reminder.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(reminder.id)}
                    className="text-slate-400 hover:text-rose-600 p-1 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Reminder Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-xl border border-slate-200">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center space-x-2">
              <Bell className="w-5 h-5 text-emerald-700" />
              <span>{i18n.addTask}</span>
            </h2>

            <form onSubmit={handleCreateReminder} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {i18n.taskName} *
                </label>
                <input
                  type="text"
                  required
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  placeholder="e.g. 2nd split Urea top dressing / Irrigation check"
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg p-2.5 font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {i18n.category}
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ReminderCategory)}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg p-2.5 font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="irrigation">💧 Irrigation Check</option>
                    <option value="fertilizer">✨ Fertilizer Application</option>
                    <option value="spraying">🌿 Protective Spraying</option>
                    <option value="pest_monitoring">🐛 Pest / Trap Scouting</option>
                    <option value="soil_testing">🧪 Soil Health Test</option>
                    <option value="harvest">🌾 Harvest Preparation</option>
                    <option value="custom">📋 General Farm Task</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {i18n.cropOrField}
                  </label>
                  <input
                    type="text"
                    value={cropOrField}
                    onChange={(e) => setCropOrField(e.target.value)}
                    placeholder="e.g. Rice Field A / Chilli Plot"
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg p-2.5 font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {i18n.date} *
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg p-2.5 font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {i18n.time} *
                  </label>
                  <input
                    type="time"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg p-2.5 font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {i18n.notes}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Check leaf symptoms and soil moisture level before operating motor"
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg p-2.5 font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 shadow-sm"
                >
                  Save Reminder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
