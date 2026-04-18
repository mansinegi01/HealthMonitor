

const Mood = require("../model/mood");

const PDFDocument = require("pdfkit");
const { ChartJSNodeCanvas } = require("chartjs-node-canvas");

// ✅ Add or Update Mood (Single Mood Per Day)
exports.addOrUpdateMood = async (req, res) => {
  try {
    const { mood } = req.body;
    const userId = req.user.id;

    const today = new Date().toISOString().split("T")[0];

    const updatedMood = await Mood.findOneAndUpdate(
      { userId, date: today },
      { mood },
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: "Mood saved successfully",
      data: updatedMood
    });

  } catch (error) {
    res.status(500).json({ error: "Failed to save mood" });
  }
};


// ✅ Get Mood Statistics
exports.getMoodStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const moods = await Mood.find({ userId });

    const daysTracked = moods.length;

    const moodFrequency = {};

    moods.forEach(m => {
      moodFrequency[m.mood] = (moodFrequency[m.mood] || 0) + 1;
    });

    let topMood = "—";
    let max = 0;

    for (let mood in moodFrequency) {
      if (moodFrequency[mood] > max) {
        max = moodFrequency[mood];
        topMood = mood;
      }
    }

    res.json({
      daysTracked,
      topMood,
      reportUnlocked: daysTracked >= 14   // ✅ CHANGED
    });

  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};


// ✅ Generate PDF Report

// exports.generateReport = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const moods = await Mood.find({ userId }).sort({ date: 1 });

//     if (moods.length < 1) {
//       return res.status(403).json({
//         error: "Minimum 1 day of tracking required"
//       });
//     }

//     // =========================
//     // 📊 DATA PROCESSING
//     // =========================
//     const moodScoreMap = {
//       sad: 2,
//       anxious: 3,
//       tired: 4,
//       neutral: 5,
//       good: 6,
//       happy: 7,
//       excited: 8
//     };

//     const moodCount = {};
//     let totalScore = 0;

//     const chartLabels = [];
//     const chartData = [];

//     moods.forEach(m => {
//       moodCount[m.mood] = (moodCount[m.mood] || 0) + 1;

//       const score = moodScoreMap[m.mood] || 5;
//       totalScore += score;

//       chartLabels.push(new Date(m.date).toLocaleDateString("en-IN", {
//         day: "numeric",
//         month: "short"
//       }));

//       chartData.push(score);
//     });

//     const daysTracked = moods.length;

//     const avgScore = (totalScore / daysTracked).toFixed(1);

//     const topMood = Object.keys(moodCount).reduce((a, b) =>
//       moodCount[a] > moodCount[b] ? a : b
//     );

//     // =========================
//     // 🤖 AI INSIGHTS (PATTERNS)
//     // =========================
//     const insights = [];

//     // Trend detection
//     const firstHalf = chartData.slice(0, Math.floor(chartData.length / 2));
//     const secondHalf = chartData.slice(Math.floor(chartData.length / 2));

//     const avg1 = firstHalf.reduce((a,b)=>a+b,0) / (firstHalf.length || 1);
//     const avg2 = secondHalf.reduce((a,b)=>a+b,0) / (secondHalf.length || 1);

//     if (avg2 > avg1) insights.push("Your mood trend is improving over time 📈");
//     else insights.push("Your mood shows slight fluctuations ⚖️");

//     // Weekend happiness
//     let weekendScore = 0, weekdayScore = 0, wCount = 0, wdCount = 0;

//     moods.forEach(m => {
//       const day = new Date(m.date).getDay();
//       const score = moodScoreMap[m.mood];

//       if (day === 0 || day === 6) {
//         weekendScore += score; wCount++;
//       } else {
//         weekdayScore += score; wdCount++;
//       }
//     });

//     if (wCount && wdCount && weekendScore/wCount > weekdayScore/wdCount) {
//       insights.push("You feel better during weekends 🌤️");
//     }

//     // Exercise assumption (based on higher mood spikes)
//     if (Math.max(...chartData) >= 7) {
//       insights.push("High mood peaks suggest positive activities like exercise 💪");
//     }

//     // =========================
//     // 📈 CREATE CHART IMAGE
//     // =========================
//     const width = 600;
//     const height = 300;

//     const chartCanvas = new ChartJSNodeCanvas({ width, height });

//     const chartImage = await chartCanvas.renderToBuffer({
//       type: "line",
//       data: {
//         labels: chartLabels,
//         datasets: [
//           {
//             label: "Mood Trend",
//             data: chartData,
//             borderWidth: 3,
//             fill: false
//           }
//         ]
//       }
//     });

//     // =========================
//     // 📄 CREATE PDF
//     // =========================
//     const doc = new PDFDocument({ margin: 40 });

//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader(
//       "Content-Disposition",
//       "attachment; filename=advanced-mood-report.pdf"
//     );

//     doc.pipe(res);

//     // 🎨 HEADER
//     doc
//       .fontSize(20)
//       .fillColor("#1a2b4b")
//       .text("YOUR MOOD ANALYSIS REPORT", { align: "center" });

//     doc.moveDown(0.5);

//     doc
//       .fontSize(10)
//       .fillColor("gray")
//       .text(`Generated on ${new Date().toDateString()}`, { align: "center" });

//     doc.moveDown(2);

//     // 📊 SUMMARY
//     doc.fillColor("black").fontSize(14).text("SUMMARY STATISTICS");
//     doc.moveDown(0.5);

//     doc.fontSize(11)
//       .text(`Total Days Tracked: ${daysTracked}`)
//       .text(`Top Mood: ${topMood}`)
//       .text(`Average Score: ${avgScore}/10`);

//     doc.moveDown();

//     // 📈 GRAPH
//     doc.fontSize(14).text("MOOD TRENDS");
//     doc.moveDown(0.5);

//     doc.image(chartImage, {
//       fit: [500, 250],
//       align: "center"
//     });

//     doc.moveDown();

//     // 🔍 INSIGHTS
//     doc.fontSize(14).text("KEY INSIGHTS");
//     doc.moveDown(0.5);

//     insights.forEach(i => doc.fontSize(11).text(`• ${i}`));

//     doc.moveDown();

//     // 💡 SUGGESTIONS
//     doc.fontSize(14).text("PERSONALIZED SUGGESTIONS");
//     doc.moveDown(0.5);

//     doc.fontSize(11)
//       .text("1. Maintain consistency in mood tracking")
//       .text("2. Continue activities that improve mood")
//       .text("3. Improve sleep & hydration")
//       .text("4. Stay socially active");

//     doc.moveDown();

//     // 📋 BREAKDOWN
//     doc.fontSize(14).text("DETAILED BREAKDOWN");
//     doc.moveDown(0.5);

//     Object.keys(moodCount).forEach(mood => {
//       const percent = ((moodCount[mood] / daysTracked) * 100).toFixed(0);
//       doc.text(`${mood}: ${percent}% (${moodCount[mood]} days)`);
//     });

//     doc.moveDown();

//     // 🎯 FINAL SCORE
//     doc
//       .fontSize(16)
//       .fillColor("#1a2b4b")
//       .text(`WELLNESS SCORE: ${avgScore}/10`, { align: "center" });

//     doc.end();

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to generate report" });
//   }
// };

exports.generateReport = async (req, res) => {
  try {
    const userId = req.user.id;
    const { timeframe = "all" } = req.query; // 'week', 'month', 'all'
 
    const moods = await Mood.find({ userId }).sort({ date: 1 });
 
    if (moods.length < 1) {
      return res.status(403).json({
        error: "Minimum 1 day of tracking required"
      });
    }
 
    // =========================
    // 📊 DATA PROCESSING
    // =========================
    const moodScoreMap = {
      sad: 2,
      anxious: 3,
      tired: 4,
      neutral: 5,
      good: 6,
      happy: 7,
      excited: 8
    };
 
    // PDFKit doesn't support emoji well - use text symbols instead
    const moodSymbol = {
      sad: "[SAD]",
      anxious: "[ANXIOUS]",
      tired: "[TIRED]",
      neutral: "[NEUTRAL]",
      good: "[GOOD]",
      happy: "[HAPPY]",
      excited: "[EXCITED]"
    };
 
    const moodCount = {};
    let totalScore = 0;
    const chartLabels = [];
    const chartData = [];
    const dayOfWeekScores = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
    const hourlyTrends = {}; // If you track time of day
 
    moods.forEach(m => {
      moodCount[m.mood] = (moodCount[m.mood] || 0) + 1;
      const score = moodScoreMap[m.mood] || 5;
      totalScore += score;
 
      chartLabels.push(new Date(m.date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short"
      }));
 
      chartData.push(score);
 
      // Track by day of week
      const dayOfWeek = new Date(m.date).getDay();
      dayOfWeekScores[dayOfWeek].push(score);
    });
 
    const daysTracked = moods.length;
    const avgScore = (totalScore / daysTracked).toFixed(1);
 
    // Top mood = best mood that user actually experienced (by score, not frequency)
    const topMood = Object.keys(moodCount).reduce((a, b) => {
      const scoreA = moodScoreMap[a] || 0;
      const scoreB = moodScoreMap[b] || 0;
      return scoreA > scoreB ? a : b;
    });
    
    // Most frequent mood (for reference)
    const mostFrequentMood = Object.keys(moodCount).reduce((a, b) =>
      moodCount[a] > moodCount[b] ? a : b
    );
 
    // =========================
    // 🔥 STREAK ANALYSIS
    // =========================
    let currentStreak = 0;
    let maxStreak = 0;
    let streakMood = null; // Which mood in the streak
    let tempStreak = 0;
    let tempMood = null;
 
    for (let i = 0; i < moods.length; i++) {
      if (i === 0) {
        tempMood = moods[i].mood;
        tempStreak = 1;
      } else {
        if (moods[i].mood === tempMood) {
          tempStreak++;
        } else {
          if (tempStreak > maxStreak) {
            maxStreak = tempStreak;
            streakMood = tempMood;
          }
          tempMood = moods[i].mood;
          tempStreak = 1;
        }
      }
    }
    if (tempStreak > maxStreak) {
      maxStreak = tempStreak;
      streakMood = tempMood;
    }
 
    // Current streak (last recorded mood)
    if (moods.length > 0) {
      currentStreak = 1;
      for (let i = moods.length - 1; i > 0; i--) {
        if (moods[i].mood === moods[i - 1].mood) {
          currentStreak++;
        } else {
          break;
        }
      }
    }
 
    // =========================
    // 📈 VOLATILITY & STABILITY
    // =========================
    const deviations = chartData.map(score => Math.pow(score - avgScore, 2));
    const variance = deviations.reduce((a, b) => a + b, 0) / daysTracked;
    const stdDev = Math.sqrt(variance).toFixed(2);
    const stabilityScore = Math.max(0, 10 - stdDev * 1.5).toFixed(1); // Higher = more stable
 
    // =========================
    // 🎯 TREND ANALYSIS
    // =========================
    const firstQuarter = chartData.slice(0, Math.floor(chartData.length / 4));
    const lastQuarter = chartData.slice(Math.floor(chartData.length * 3 / 4));
 
    const avgFirst = firstQuarter.reduce((a, b) => a + b, 0) / (firstQuarter.length || 1);
    const avgLast = lastQuarter.reduce((a, b) => a + b, 0) / (lastQuarter.length || 1);
 
    const trendDirection = avgLast > avgFirst ? "improving" : avgLast < avgFirst ? "declining" : "stable";
    const trendPercent = Math.abs(((avgLast - avgFirst) / avgFirst) * 100).toFixed(1);
 
    // =========================
    // 📅 DAY OF WEEK ANALYSIS
    // =========================
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayStats = {};
 
    Object.keys(dayOfWeekScores).forEach(day => {
      const scores = dayOfWeekScores[day];
      if (scores.length > 0) {
        dayStats[dayNames[day]] = {
          avg: (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1),
          count: scores.length,
          best: Math.max(...scores),
          worst: Math.min(...scores)
        };
      }
    });
 
    // Best and worst days
    const bestDay = Object.keys(dayStats).reduce((a, b) =>
      dayStats[a].avg > dayStats[b].avg ? a : b
    );
    const worstDay = Object.keys(dayStats).reduce((a, b) =>
      dayStats[a].avg < dayStats[b].avg ? a : b
    );
 
    // =========================
    // 🤖 AI INSIGHTS
    // =========================
    const insights = [];
 
    // Trend
    if (trendDirection === "improving") {
      insights.push(`Your mood is ${trendDirection} by ${trendPercent}% overall [TRENDING UP]`);
    } else if (trendDirection === "declining") {
      insights.push(`Your mood is ${trendDirection} by ${trendPercent}%. Consider stress relief activities [TRENDING DOWN]`);
    } else {
      insights.push("Your mood is remaining relatively stable [STABLE]");
    }
 
    // Weekend vs Weekday
    let weekendScore = 0, weekdayScore = 0, wCount = 0, wdCount = 0;
    moods.forEach(m => {
      const day = new Date(m.date).getDay();
      const score = moodScoreMap[m.mood];
      if (day === 0 || day === 6) {
        weekendScore += score; wCount++;
      } else {
        weekdayScore += score; wdCount++;
      }
    });
 
    if (wCount && wdCount) {
      const weekendAvg = weekendScore / wCount;
      const weekdayAvg = weekdayScore / wdCount;
      if (weekendAvg > weekdayAvg) {
        insights.push(`You're happier on weekends (+${(weekendAvg - weekdayAvg).toFixed(1)} points) [WEEKEND EFFECT]`);
      } else if (weekdayAvg > weekendAvg) {
        insights.push(`You're more energized on weekdays (+${(weekdayAvg - weekendAvg).toFixed(1)} points) [WEEKDAY EFFECT]`);
      }
    }
 
    // Stability
    if (stabilityScore > 7) {
      insights.push(`Your moods are very stable (${stabilityScore}/10) - great emotional consistency! [STABLE]`);
    } else if (stabilityScore > 5) {
      insights.push(`Your moods show moderate fluctuations (${stabilityScore}/10) [MODERATE VOLATILITY]`);
    } else {
      insights.push(`Your moods are quite variable (${stabilityScore}/10) - consider mood triggers [HIGH VOLATILITY]`);
    }
 
    // Streak
    if (maxStreak >= 3) {
      insights.push(`Your longest ${streakMood} streak: ${maxStreak} consecutive days! [STREAK RECORD]`);
    }
 
    // Best/Worst days
    insights.push(`Your best day is ${bestDay} (avg: ${dayStats[bestDay].avg}/10) [PEAK DAY]`);
    insights.push(`${worstDay}s are your toughest (avg: ${dayStats[worstDay].avg}/10) [CHALLENGING DAY]`);
 
    // Positivity ratio
    const happyMoods = ["happy", "excited", "good"];
    const negativeMoods = ["sad", "anxious"];
    const happyCount = happyMoods.reduce((sum, m) => sum + (moodCount[m] || 0), 0);
    const negativeCount = negativeMoods.reduce((sum, m) => sum + (moodCount[m] || 0), 0);
    const positivityRatio = ((happyCount / daysTracked) * 100).toFixed(0);
 
    insights.push(`Positivity ratio: ${positivityRatio}% of days were positive [WELL-BEING INDEX]`);
 
    // =========================
    // 💡 PERSONALIZED SUGGESTIONS
    // =========================
    const suggestions = [];
 
    if (trendDirection === "declining") {
      suggestions.push("Schedule activities you enjoy - your mood needs a boost");
      suggestions.push("Reach out to friends or family for social support");
    }
 
    if (stabilityScore < 5) {
      suggestions.push("Practice mindfulness or meditation for emotional balance");
      suggestions.push("Track potential mood triggers in your notes");
    }
 
    if (positivityRatio < 40) {
      suggestions.push("Incorporate positive activities: exercise, hobbies, nature");
    } else if (positivityRatio > 70) {
      suggestions.push("You're doing great! Keep up your positive habits");
    }
 
    suggestions.push(`Focus on improving your ${worstDay}s with planned activities`);
    suggestions.push("Maintain consistent tracking - you're doing excellent");
 
    // =========================
    // 📊 CREATE CHARTS
    // =========================
    const width = 600;
    const height = 300;
    const chartCanvas = new ChartJSNodeCanvas({ width, height });
 
    // Line chart - Mood over time
    const lineChartImage = await chartCanvas.renderToBuffer({
      type: "line",
      data: {
        labels: chartLabels,
        datasets: [
          {
            label: "Mood Trend",
            data: chartData,
            borderColor: "#1a2b4b",
            backgroundColor: "rgba(26, 43, 75, 0.1)",
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: "#1a2b4b"
          }
        ]
      },
      options: {
        plugins: {
          legend: { display: true, labels: { font: { size: 12 } } }
        },
        scales: {
          y: { min: 0, max: 10, beginAtZero: true }
        }
      }
    });
 
    // Bar chart - Mood distribution
    const barChartImage = await chartCanvas.renderToBuffer({
      type: "bar",
      data: {
        labels: Object.keys(moodCount),
        datasets: [
          {
            label: "Mood Frequency",
            data: Object.values(moodCount),
            backgroundColor: [
              "#ff6b6b", "#ffa500", "#f4d35e", "#a8dadc", "#457b9d", "#1d3557", "#e63946"
            ]
          }
        ]
      },
      options: {
        indexAxis: "x",
        plugins: {
          legend: { display: false }
        }
      }
    });
 
    // Radar chart - Day of week performance
    const dayLabels = Object.keys(dayStats);
    const dayValues = Object.values(dayStats).map(d => parseFloat(d.avg));
 
    const radarChartImage = await chartCanvas.renderToBuffer({
      type: "radar",
      data: {
        labels: dayLabels,
        datasets: [
          {
            label: "Average Mood by Day",
            data: dayValues,
            borderColor: "#1a2b4b",
            backgroundColor: "rgba(26, 43, 75, 0.2)",
            borderWidth: 2
          }
        ]
      },
      options: {
        scales: {
          r: { min: 0, max: 10, beginAtZero: true }
        }
      }
    });
 
    // =========================
    // 📄 CREATE PDF
    // =========================
    const doc = new PDFDocument({ margin: 40 });
 
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=mood-analysis-report.pdf"
    );
 
    doc.pipe(res);
 
    // ===== PAGE 1: HEADER & SUMMARY =====
    doc
      .fontSize(24)
      .fillColor("#1a2b4b")
      .text("YOUR MOOD ANALYSIS REPORT", { align: "center" });
 
    doc.moveDown(0.3);
    doc
      .fontSize(10)
      .fillColor("gray")
      .text(`Generated on ${new Date().toDateString()} | ${daysTracked} days tracked`, { align: "center" });
 
    doc.moveDown(1.5);
 
    // Summary boxes
    const summaryItems = [
      { label: "Average Mood", value: `${avgScore}/10`, icon: "[AVG]" },
      { label: "Best Mood Achieved", value: topMood, icon: "[BEST]" },
      { label: "Stability", value: `${stabilityScore}/10`, icon: "[STAB]" },
      { label: "Trend", value: trendDirection, icon: "[TREND]" }
    ];
 
    doc.fontSize(11).fillColor("black");
 
    summaryItems.forEach((item, idx) => {
      const x = 50 + (idx % 2) * 250;
      const y = 140 + Math.floor(idx / 2) * 70;
 
      doc.rect(x, y, 220, 60).stroke("#e0e0e0");
      doc.fontSize(9).fillColor("gray").text(item.label, x + 10, y + 10);
      doc.fontSize(16).fillColor("#1a2b4b").text(item.value, x + 10, y + 25);
    });
 
    doc.moveDown(4);
 
    // ===== STATS SECTION =====
    doc.fontSize(14).fillColor("#1a2b4b").text("QUICK STATS");
    doc.moveDown(0.5);
 
    doc.fontSize(10).fillColor("black")
      .text(`Total Days Tracked: ${daysTracked}`)
      .text(`Current Streak: ${currentStreak} days of ${moods[moods.length - 1].mood}`)
      .text(`Longest Streak: ${maxStreak} days of ${streakMood}`)
      .text(`Best Day: ${bestDay} (${dayStats[bestDay].avg}/10)`)
      .text(`Most Challenging: ${worstDay} (${dayStats[worstDay].avg}/10)`);
 
    doc.moveDown(1);
 
    // ===== PAGE 2: VISUALIZATIONS =====
    doc.addPage();
 
    doc.fontSize(14).fillColor("#1a2b4b").text("MOOD TRENDS OVER TIME");
    doc.moveDown(0.5);
 
    doc.image(lineChartImage, {
      fit: [520, 250],
      align: "center"
    });
 
    doc.moveDown(1);
 
    doc.fontSize(14).fillColor("#1a2b4b").text("MOOD DISTRIBUTION");
    doc.moveDown(0.5);
 
    doc.image(barChartImage, {
      fit: [520, 250],
      align: "center"
    });
 
    // ===== PAGE 3: ANALYSIS =====
    doc.addPage();
 
    doc.fontSize(14).fillColor("#1a2b4b").text("DETAILED BREAKDOWN");
    doc.moveDown(0.5);
 
    doc.image(radarChartImage, {
      fit: [400, 300],
      align: "center"
    });
 
    doc.moveDown(1);
 
    Object.keys(dayStats).forEach(day => {
      const stat = dayStats[day];
      doc.fontSize(10).fillColor("black")
        .text(`${day}: ${stat.avg}/10 (${stat.count} days) - Best: ${stat.best}, Worst: ${stat.worst}`);
    });
 
    // ===== PAGE 4: INSIGHTS & SUGGESTIONS =====
    doc.addPage();
 
    doc.fontSize(14).fillColor("#1a2b4b").text("KEY INSIGHTS");
    doc.moveDown(0.5);
 
    insights.forEach(insight => {
      doc.fontSize(11).fillColor("black").text(`• ${insight}`, { align: "left" });
      doc.moveDown(0.3);
    });
 
    doc.moveDown(1);
 
    doc.fontSize(14).fillColor("#1a2b4b").text("PERSONALIZED SUGGESTIONS");
    doc.moveDown(0.5);
 
    suggestions.forEach((suggestion, idx) => {
      doc.fontSize(11).fillColor("black").text(`${idx + 1}. ${suggestion}`, { align: "left" });
      doc.moveDown(0.3);
    });
 
    // ===== FOOTER =====
    doc.moveDown(1);
    doc.fontSize(9).fillColor("gray")
      .text("Remember: Tracking your mood is the first step to understanding yourself better.", { align: "center" });
    doc.text("Be kind to yourself and celebrate your progress!", { align: "center" });
 
    doc.end();
 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate report" });
  }
};
 



// ✅ Mood History
exports.getMoodHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const moods = await Mood.find({ userId }).sort({ date: 1 });

    res.json(moods);

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
};