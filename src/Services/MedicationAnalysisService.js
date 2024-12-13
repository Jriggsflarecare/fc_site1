export const analyzeMedicationPatterns = (medications, symptoms) => {
  try {
    // Group medications by type
    const medsByType = medications.reduce((acc, med) => {
      const type = med.type || 'other';
      if (!acc[type]) acc[type] = [];
      acc[type].push(med);
      return acc;
    }, {});

    // Calculate adherence rates by medication type
    const adherenceByType = {};
    Object.entries(medsByType).forEach(([type, meds]) => {
      const typeAdherence = calculateTypeAdherence(meds);
      adherenceByType[type] = typeAdherence;
    });

    // Analyze symptom correlation with missed doses
    const missedDoseCorrelations = analyzeMissedDoseImpact(medications, symptoms);

    // Generate effectiveness insights
    const effectivenessInsights = analyzeEffectiveness(medications, symptoms);

    return {
      adherenceByType,
      missedDoseCorrelations,
      effectivenessInsights,
      recommendations: generateRecommendations(adherenceByType, missedDoseCorrelations)
    };
  } catch (error) {
    console.error('Medication analysis error:', error);
    return null;
  }
};

const calculateTypeAdherence = (medications) => {
  let totalDoses = 0;
  let takenDoses = 0;

  medications.forEach(med => {
    const last7Days = getLast7Days();
    const expectedDailyDoses = med.times?.length || 1;
    totalDoses += expectedDailyDoses * 7;

    med.takenDates?.forEach(date => {
      if (last7Days.includes(date)) {
        takenDoses++;
      }
    });
  });

  return {
    rate: totalDoses > 0 ? (takenDoses / totalDoses) * 100 : 0,
    totalDoses,
    takenDoses
  };
};

const analyzeMissedDoseImpact = (medications, symptoms) => {
  const correlations = [];

  medications.forEach(med => {
    const missedDates = findMissedDoses(med);
    const symptomSpikes = findSymptomSpikes(symptoms, missedDates);

    if (symptomSpikes.length > 0) {
      correlations.push({
        medicationId: med.id,
        medicationName: med.name,
        missedDoses: missedDates.length,
        symptomSpikes: symptomSpikes.length,
        correlation: calculateCorrelation(missedDates, symptomSpikes)
      });
    }
  });

  return correlations;
};

const analyzeEffectiveness = (medications, symptoms) => {
  const insights = [];

  medications.forEach(med => {
    const adherentPeriods = findAdherentPeriods(med);
    const symptomTrends = analyzeSymptomTrends(symptoms, adherentPeriods);

    insights.push({
      medicationId: med.id,
      medicationName: med.name,
      effectiveness: calculateEffectiveness(symptomTrends),
      trends: symptomTrends
    });
  });

  return insights;
};

const generateRecommendations = (adherenceByType, correlations) => {
  const recommendations = [];

  // Adherence-based recommendations
  Object.entries(adherenceByType).forEach(([type, data]) => {
    if (data.rate < 80) {
      recommendations.push({
        type: 'adherence',
        priority: 'high',
        message: `Consider setting additional reminders for ${type} medications (${data.rate.toFixed(1)}% adherence)`
      });
    }
  });

  // Correlation-based recommendations
  correlations.forEach(corr => {
    if (corr.correlation > 0.7) {
      recommendations.push({
        type: 'impact',
        priority: 'high',
        message: `Missing doses of ${corr.medicationName} shows strong correlation with symptom flares`
      });
    }
  });

  return recommendations;
};

// Helper functions
const getLast7Days = () => {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
};

const findMissedDoses = (medication) => {
  const last7Days = getLast7Days();
  return last7Days.filter(date => !medication.takenDates?.includes(date));
};

const findSymptomSpikes = (symptoms, dates) => {
  return symptoms.filter(symptom => {
    const symptomDate = new Date(symptom.date).toISOString().split('T')[0];
    return dates.includes(symptomDate) && symptom.painLevel > 5;
  });
};

const calculateCorrelation = (missedDates, symptomSpikes) => {
  // Simple correlation calculation
  const spikesDates = symptomSpikes.map(spike => 
    new Date(spike.date).toISOString().split('T')[0]
  );
  
  const overlap = missedDates.filter(date => 
    spikesDates.includes(date) || 
    spikesDates.includes(getNextDay(date))
  );

  return overlap.length / missedDates.length;
};

const findAdherentPeriods = (medication) => {
  const periods = [];
  let currentPeriod = [];
  
  getLast7Days().forEach(date => {
    if (medication.takenDates?.includes(date)) {
      currentPeriod.push(date);
    } else if (currentPeriod.length > 0) {
      periods.push([...currentPeriod]);
      currentPeriod = [];
    }
  });
  
  if (currentPeriod.length > 0) {
    periods.push(currentPeriod);
  }
  
  return periods;
};

const analyzeSymptomTrends = (symptoms, adherentPeriods) => {
  return adherentPeriods.map(period => {
    const periodSymptoms = symptoms.filter(symptom => {
      const symptomDate = new Date(symptom.date).toISOString().split('T')[0];
      return period.includes(symptomDate);
    });

    return {
      period,
      averagePain: calculateAveragePain(periodSymptoms),
      symptomCount: periodSymptoms.length
    };
  });
};

const calculateEffectiveness = (trends) => {
  if (trends.length === 0) return 0;
  
  const totalScore = trends.reduce((sum, trend) => {
    const painScore = 10 - trend.averagePain;
    const symptomScore = Math.max(0, 10 - trend.symptomCount);
    return sum + (painScore + symptomScore) / 2;
  }, 0);

  return totalScore / trends.length;
};

const calculateAveragePain = (symptoms) => {
  if (symptoms.length === 0) return 0;
  return symptoms.reduce((sum, s) => sum + s.painLevel, 0) / symptoms.length;
};

const getNextDay = (dateString) => {
  const date = new Date(dateString);
  date.setDate(date.getDate() + 1);
  return date.toISOString().split('T')[0];
}; 