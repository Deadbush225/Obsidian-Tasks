package com.example.gantt_viewer

import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.Context
import android.content.Intent
import android.graphics.Color
import android.widget.RemoteViews
import org.json.JSONArray
import org.json.JSONObject

class GanttWidgetProvider : AppWidgetProvider() {

    override fun onUpdate(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetIds: IntArray
    ) {
        for (id in appWidgetIds) {
            updateWidget(context, appWidgetManager, id)
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
