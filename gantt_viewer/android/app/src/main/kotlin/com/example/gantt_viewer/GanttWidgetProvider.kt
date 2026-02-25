package com.example.gantt_viewer

import android.app.AlarmManager
import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.graphics.Color
import android.widget.RemoteViews
import org.json.JSONArray
import org.json.JSONObject
import java.io.File

class GanttWidgetProvider : AppWidgetProvider() {

    override fun onUpdate(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetIds: IntArray
    ) {
        scheduleAutoRefresh(context)
        val tasks = scanAndBuildTaskJson(context)
        for (id in appWidgetIds) {
            renderWidget(context, appWidgetManager, id, tasks)
        }
    }

    override fun onEnabled(context: Context) {
        super.onEnabled(context)
        scheduleAutoRefresh(context)
    }

    override fun onDisabled(context: Context) {
        super.onDisabled(context)
        cancelAutoRefresh(context)
    }

    // Called by AlarmManager every 30 minutes
    override fun onReceive(context: Context, intent: Intent) {
        super.onReceive(context, intent)
        if (intent.action == ACTION_REFRESH) {
            val manager = AppWidgetManager.getInstance(context)
            val ids = manager.getAppWidgetIds(ComponentName(context, GanttWidgetProvider::class.java))
            if (ids.isNotEmpty()) {
                val tasks = scanAndBuildTaskJson(context)
                for (id in ids) renderWidget(context, manager, id, tasks)
            }
        }
    }

    companion object {
        private const val ACTION_REFRESH = "com.example.gantt_viewer.WIDGET_REFRESH"
        // Refresh every 30 minutes (minimum meaningful interval)
        private const val REFRESH_INTERVAL_MS = 30 * 60 * 1000L

        private val PALETTE = intArrayOf(
            Color.parseColor("#7C6AF7"), Color.parseColor("#F7926A"),
            Color.parseColor("#6BBFF7"), Color.parseColor("#F7C86A"),
            Color.parseColor("#6AF79E"), Color.parseColor("#F76A9E"),
            Color.parseColor("#6AF7F0"), Color.parseColor("#C86AF7"),
            Color.parseColor("#F7F06A"), Color.parseColor("#6A9EF7")
        )

        // ── AlarmManager scheduling ───────────────────────────────────────────

        private fun refreshIntent(context: Context): PendingIntent {
            val intent = Intent(context, GanttWidgetProvider::class.java).apply {
                action = ACTION_REFRESH
            }
            return PendingIntent.getBroadcast(
                context, 0, intent,
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
            )
        }

        fun scheduleAutoRefresh(context: Context) {
            val alarm = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
            alarm.setInexactRepeating(
                AlarmManager.RTC,
                System.currentTimeMillis() + REFRESH_INTERVAL_MS,
                REFRESH_INTERVAL_MS,
                refreshIntent(context)
            )
        }

        fun cancelAutoRefresh(context: Context) {
            val alarm = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
            alarm.cancel(refreshIntent(context))
        }

        // ── Markdown scanner (runs in widget process, no Flutter needed) ──────

        /** Reads project root from shared_preferences (key flutter.project_root) */
        private fun getProjectRoot(context: Context): String? {
            val prefs = context.getSharedPreferences("FlutterSharedPreferences", Context.MODE_PRIVATE)
            return prefs.getString("flutter.project_root", null)
        }

        private fun parseField(frontmatter: String, vararg keys: String): String? {
            for (key in keys) {
                val regex = Regex("""^$key\s*:\s*(.+)$""", RegexOption.MULTILINE)
                val v = regex.find(frontmatter)?.groupValues?.get(1)?.trim()
                    ?.trimStart('"', '\'')?.trimEnd('"', '\'')
                if (!v.isNullOrEmpty()) return v
            }
            return null
        }

        private fun daysUntilDue(endDate: String): Int {
            return try {
                val parts = endDate.split("-")
                val cal = java.util.Calendar.getInstance().apply {
                    set(parts[0].toInt(), parts[1].toInt() - 1, parts[2].toInt(), 0, 0, 0)
                    set(java.util.Calendar.MILLISECOND, 0)
                }
                val today = java.util.Calendar.getInstance().apply {
                    set(java.util.Calendar.HOUR_OF_DAY, 0); set(java.util.Calendar.MINUTE, 0)
                    set(java.util.Calendar.SECOND, 0); set(java.util.Calendar.MILLISECOND, 0)
                }
                ((cal.timeInMillis - today.timeInMillis) / 86400000L).toInt()
            } catch (e: Exception) { 9999 }
        }

        data class TaskEntry(
            val title: String, val endDate: String?,
            val status: String, val colorIdx: Int
        )

        private fun parseMdFile(file: File, colorIdx: Int): TaskEntry? {
            return try {
                val text = file.readText()
                val fmMatch = Regex("""^---\r?\n([\s\S]*?)\r?\n---""", RegexOption.MULTILINE).find(text)
                    ?: return null
                val fm = fmMatch.groupValues[1]
                val title = parseField(fm, "title") ?: file.nameWithoutExtension
                val status = parseField(fm, "status") ?: "todo"
                val endDate = parseField(fm, "endDate", "end_date", "due", "end")
                TaskEntry(title, endDate, status, colorIdx)
            } catch (e: Exception) { null }
        }

        private fun scanTasks(rootPath: String): List<TaskEntry> {
            val root = File(rootPath)
            if (!root.exists()) return emptyList()
            val tasks = mutableListOf<TaskEntry>()
            var colorIdx = 0

            fun scanDir(dir: File) {
                dir.listFiles()?.filter { it.isFile && it.extension == "md" }?.forEach { f ->
                    parseMdFile(f, colorIdx)?.let { tasks.add(it); colorIdx++ }
                }
            }

            scanDir(root)
            root.listFiles()?.filter { it.isDirectory && it.name != "archive" }?.forEach { scanDir(it) }
            tasks.sortWith(compareBy { it.endDate?.let { d -> daysUntilDue(d) } ?: 9999 })
            return tasks
        }

        fun scanAndBuildTaskJson(context: Context): JSONArray {
            val root = getProjectRoot(context) ?: return JSONArray()
            val tasks = scanTasks(root)
            val arr = JSONArray()
            tasks.take(10).forEachIndexed { i, t ->
                arr.put(JSONObject().apply {
                    put("title", t.title)
                    put("endDate", t.endDate ?: "")
                    put("status", t.status)
                    put("colorIdx", t.colorIdx)
                })
            }
            // Also persist so the Flutter app stays in sync when opened
            context.getSharedPreferences("HomeWidgetPreferences", Context.MODE_PRIVATE)
                .edit().putString("tasks_json", arr.toString()).apply()
            return arr
        }

        // ── Widget rendering ──────────────────────────────────────────────────

        fun updateWidget(context: Context, appWidgetManager: AppWidgetManager, appWidgetId: Int) {
            val tasks = scanAndBuildTaskJson(context)
            renderWidget(context, appWidgetManager, appWidgetId, tasks)
        }

        fun renderWidget(context: Context, appWidgetManager: AppWidgetManager, appWidgetId: Int, tasks: JSONArray) {
            val views = RemoteViews(context.packageName, R.layout.gantt_widget)

            // Tap widget → open the app
            val launchIntent = Intent(context, MainActivity::class.java)
            val pi = PendingIntent.getActivity(
                context, 0, launchIntent,
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
            )
            views.setOnClickPendingIntent(R.id.widget_root, pi)

            val rowIds    = listOf(R.id.task_row_0,   R.id.task_row_1,   R.id.task_row_2,   R.id.task_row_3,   R.id.task_row_4)
            val titleIds  = listOf(R.id.task_title_0, R.id.task_title_1, R.id.task_title_2, R.id.task_title_3, R.id.task_title_4)
            val dueIds    = listOf(R.id.task_due_0,   R.id.task_due_1,   R.id.task_due_2,   R.id.task_due_3,   R.id.task_due_4)
            val dotIds    = listOf(R.id.task_dot_0,   R.id.task_dot_1,   R.id.task_dot_2,   R.id.task_dot_3,   R.id.task_dot_4)

            for (rowId in rowIds) views.setViewVisibility(rowId, android.view.View.GONE)

            val count = minOf(tasks.length(), 5)
            if (count == 0) {
                views.setTextViewText(R.id.widget_title, "No tasks found")
            } else {
                views.setTextViewText(R.id.widget_title, "📋 Tasks ($count)")
                for (i in 0 until count) {
                    val task = tasks.getJSONObject(i)
                    val title    = task.optString("title", "Untitled")
                    val endDate  = task.optString("endDate", "")
                    val colorIdx = task.optInt("colorIdx", i)
                    val color    = PALETTE[colorIdx % PALETTE.size]

                    views.setViewVisibility(rowIds[i], android.view.View.VISIBLE)
                    views.setTextViewText(titleIds[i], title)
                    views.setInt(dotIds[i], "setColorFilter", color)

                    if (endDate.isNotEmpty()) {
                        val daysLeft = daysUntilDue(endDate)
                        views.setTextViewText(dueIds[i], when {
                            daysLeft < 0  -> "Overdue ${-daysLeft}d"
                            daysLeft == 0 -> "Due today"
                            daysLeft <= 3 -> "Due in ${daysLeft}d"
                            else          -> endDate
                        })
                        views.setTextColor(dueIds[i], when {
                            daysLeft < 0  -> Color.parseColor("#E84040")
                            daysLeft == 0 -> Color.parseColor("#FFCD5E")
                            daysLeft <= 3 -> Color.parseColor("#F7926A")
                            else          -> Color.parseColor("#AAAAAA")
                        })
                    } else {
                        views.setTextViewText(dueIds[i], "")
                    }
                }
            }

            appWidgetManager.updateAppWidget(appWidgetId, views)
        }
    }
}


    companion object {
        // Same palette as the Obsidian plugin / Flutter app
        private val PALETTE = intArrayOf(
            Color.parseColor("#7C6AF7"), Color.parseColor("#F7926A"),
            Color.parseColor("#6BBFF7"), Color.parseColor("#F7C86A"),
            Color.parseColor("#6AF79E"), Color.parseColor("#F76A9E"),
            Color.parseColor("#6AF7F0"), Color.parseColor("#C86AF7"),
            Color.parseColor("#F7F06A"), Color.parseColor("#6A9EF7")
        )

        fun updateWidget(context: Context, appWidgetManager: AppWidgetManager, appWidgetId: Int) {
            // home_widget 0.6+ stores data in "HomeWidgetPreferences" with no key prefix
            val prefs = context.getSharedPreferences("HomeWidgetPreferences", Context.MODE_PRIVATE)
            val raw = prefs.getString("tasks_json", null)

            val views = RemoteViews(context.packageName, R.layout.gantt_widget)

            // Tap widget → open the app
            val launchIntent = Intent(context, MainActivity::class.java)
            val pi = PendingIntent.getActivity(
                context, 0, launchIntent,
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
            )
            views.setOnClickPendingIntent(R.id.widget_root, pi)

            // Clear all task rows first
            val rowIds = listOf(
                R.id.task_row_0, R.id.task_row_1, R.id.task_row_2,
                R.id.task_row_3, R.id.task_row_4
            )
            val titleIds = listOf(
                R.id.task_title_0, R.id.task_title_1, R.id.task_title_2,
                R.id.task_title_3, R.id.task_title_4
            )
            val dueIds = listOf(
                R.id.task_due_0, R.id.task_due_1, R.id.task_due_2,
                R.id.task_due_3, R.id.task_due_4
            )
            val dotIds = listOf(
                R.id.task_dot_0, R.id.task_dot_1, R.id.task_dot_2,
                R.id.task_dot_3, R.id.task_dot_4
            )

            // Hide all rows initially
            for (rowId in rowIds) {
                views.setViewVisibility(rowId, android.view.View.GONE)
            }

            if (raw == null) {
                views.setTextViewText(R.id.widget_title, "No tasks loaded")
            } else {
                val tasks = JSONArray(raw)
                val count = minOf(tasks.length(), 5)
                views.setTextViewText(R.id.widget_title, "📋 Tasks ($count)")

                for (i in 0 until count) {
                    val task = tasks.getJSONObject(i)
                    val title = task.optString("title", "Untitled")
                    val endDate = task.optString("endDate", "")
                    val colorIdx = task.optInt("colorIdx", i)
                    val color = PALETTE[colorIdx % PALETTE.size]

                    views.setViewVisibility(rowIds[i], android.view.View.VISIBLE)
                    views.setTextViewText(titleIds[i], title)
                    views.setInt(dotIds[i], "setColorFilter", color)

                    if (endDate.isNotEmpty()) {
                        val daysLeft = daysUntilDue(endDate)
                        val dueText = when {
                            daysLeft < 0  -> "Overdue ${-daysLeft}d"
                            daysLeft == 0 -> "Due today"
                            daysLeft <= 3 -> "Due in ${daysLeft}d"
                            else          -> endDate
                        }
                        val dueColor = when {
                            daysLeft < 0  -> Color.parseColor("#E84040")
                            daysLeft == 0 -> Color.parseColor("#FFCD5E")
                            daysLeft <= 3 -> Color.parseColor("#F7926A")
                            else          -> Color.parseColor("#AAAAAA")
                        }
                        views.setTextViewText(dueIds[i], dueText)
                        views.setTextColor(dueIds[i], dueColor)
                    } else {
                        views.setTextViewText(dueIds[i], "")
                    }
                }
            }

            appWidgetManager.updateAppWidget(appWidgetId, views)
        }

        private fun daysUntilDue(endDate: String): Int {
            return try {
                val parts = endDate.split("-")
                val cal = java.util.Calendar.getInstance()
                cal.set(parts[0].toInt(), parts[1].toInt() - 1, parts[2].toInt(), 0, 0, 0)
                cal.set(java.util.Calendar.MILLISECOND, 0)
                val today = java.util.Calendar.getInstance()
                today.set(java.util.Calendar.HOUR_OF_DAY, 0)
                today.set(java.util.Calendar.MINUTE, 0)
                today.set(java.util.Calendar.SECOND, 0)
                today.set(java.util.Calendar.MILLISECOND, 0)
                val diff = cal.timeInMillis - today.timeInMillis
                (diff / 86400000L).toInt()
            } catch (e: Exception) {
                9999
            }
        }
    }
}
