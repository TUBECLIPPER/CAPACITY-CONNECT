import React, { useState } from 'react';
import { 
  FileCheck, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  Award, 
  Play, 
  ArrowRight,
  X,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Assessment } from '../types';

interface AssessmentsViewProps {
  assessments: Assessment[];
  onCompleteAssessment: (id: string, score: number) => void;
}

export const AssessmentsView: React.FC<AssessmentsViewProps> = ({
  assessments = [],
  onCompleteAssessment
}) => {
  const safeAssessments = Array.isArray(assessments) ? assessments : [];
  const [activeQuiz, setActiveQuiz] = useState<Assessment | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Sample interactive questions for activeQuiz
  const quizQuestions = [
    {
      question: 'Which Doppler radar product is primary for detecting the Mesocyclone signature in a severe convective thunderstorm?',
      options: [
        'Base Reflectivity (Z) at lowest tilt',
        'Storm-Relative Velocity (SRV) showing azimuthal shear couplet',
        'Echo Tops (ET) product',
        'Vertically Integrated Liquid (VIL)'
      ],
      correctIndex: 1
    },
    {
      question: 'In the Dvorak Tropical Cyclone analysis technique, what does the "T-number" directly estimate?',
      options: [
        'Central core sea-surface salinity',
        'Cloud pattern intensity and maximum sustained 10-minute surface wind',
        'Total precipitable water vapor column',
        'Storm surge inland inundation distance'
      ],
      correctIndex: 1
    },
    {
      question: 'What is the primary physical implication of a Dual-Polarization Differential Reflectivity (ZDR) near 0 dB paired with High Reflectivity (55+ dBZ)?',
      options: [
        'Heavy rain with large horizontally flattened drops',
        'Tumbling spherical or irregular hail stones',
        'Chaff or anomalous propagation clutter',
        'Low-level temperature inversion'
      ],
      correctIndex: 1
    },
    {
      question: 'In Numerical Weather Prediction (WRF), the Courant-Friedrichs-Lewy (CFL) stability condition governs:',
      options: [
        'The maximum allowable computational time step relative to grid spacing',
        'Soil moisture initialization thresholds',
        'Planetary boundary layer turbulence closure',
        'Solar radiation zenith angle'
      ],
      correctIndex: 0
    }
  ];

  const handleStartQuiz = (assessment: Assessment) => {
    setActiveQuiz(assessment);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setQuizScore(0);
  };

  const handleSelectOption = (optionIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: optionIndex
    });
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    quizQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        score += 25;
      }
    });

    setQuizScore(score);
    setIsSubmitted(true);
    if (activeQuiz) {
      onCompleteAssessment(activeQuiz.id, score);
    }

    if (score >= 75) {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2457C5]">Operational Evaluation</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] tracking-tight">
            Assessments &amp; Simulator Diagnostics
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Verify your forecasting accuracy across radar interpretation, tropical cyclone analysis, and numerical model physics. A minimum score of 75% is required for WMO credential endorsement.
          </p>
        </div>
      </div>

      {/* Assessment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {safeAssessments.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-[#2457C5]/50 hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  item.type === 'Practical Simulation' ? 'bg-indigo-50 text-indigo-700' :
                  item.type === 'Quiz' ? 'bg-blue-50 text-blue-700' :
                  'bg-teal-50 text-teal-700'
                }`}>
                  {item.type}
                </span>

                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  item.status === 'Graded' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                  'bg-amber-50 text-amber-800 border border-amber-200'
                }`}>
                  {item.status}
                </span>
              </div>

              <h3 className="text-sm font-bold text-[#102A43] mb-1 leading-snug">{item.title}</h3>
              <p className="text-xs text-slate-500 line-clamp-1 mb-4">{item.courseTitle}</p>

              <div className="space-y-1.5 text-xs text-slate-600 pb-4 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Due Date:</span>
                  <span className="font-semibold text-slate-800">{item.dueDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Max Score:</span>
                  <span className="font-semibold text-slate-800">{item.maxScore} Points</span>
                </div>
                {item.score !== undefined && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Score Earned:</span>
                    <span className="font-bold text-emerald-700">{item.score} / {item.maxScore}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 border-t border-slate-100">
              <span className="text-[11px] text-slate-400">CTI Verified Exam</span>
              <button
                onClick={() => handleStartQuiz(item)}
                className="px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <span>{item.status === 'Graded' ? 'Retake Diagnostic' : 'Start Assessment'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ========================================================= */}
      {/* INTERACTIVE ASSESSMENT SIMULATOR MODAL */}
      {/* ========================================================= */}
      {activeQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden relative my-auto">
            
            {/* Modal Header */}
            <div className="bg-[#091E3A] text-white p-5 sm:p-6 flex items-center justify-between border-b border-cyan-900/60">
              <div>
                <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider">
                  CTI Online Examination System
                </span>
                <h3 className="text-base font-bold text-white">{activeQuiz.title}</h3>
                <p className="text-xs text-slate-300">{activeQuiz.courseTitle}</p>
              </div>
              <button
                onClick={() => setActiveQuiz(null)}
                className="p-1 rounded-full text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quiz Body */}
            {!isSubmitted ? (
              <div className="p-5 sm:p-6 space-y-6">
                <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-3">
                  <span>Question <strong>{currentQuestionIndex + 1}</strong> of <strong>{quizQuestions.length}</strong></span>
                  <span className="text-amber-700 font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> 18 Mins Remaining
                  </span>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-[#102A43] leading-relaxed">
                    {quizQuestions[currentQuestionIndex].question}
                  </h4>

                  <div className="space-y-2.5">
                    {quizQuestions[currentQuestionIndex].options.map((opt, oIdx) => {
                      const isSelected = selectedAnswers[currentQuestionIndex] === oIdx;

                      return (
                        <div
                          key={oIdx}
                          onClick={() => handleSelectOption(oIdx)}
                          className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center gap-3 text-xs ${
                            isSelected
                              ? 'border-cyan-600 bg-cyan-50/70 font-semibold text-slate-900 ring-2 ring-cyan-500/20'
                              : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                            isSelected ? 'border-cyan-600 bg-cyan-600 text-white' : 'border-slate-300 text-slate-500'
                          }`}>
                            {String.fromCharCode(65 + oIdx)}
                          </div>
                          <span>{opt}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Footer buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    disabled={currentQuestionIndex === 0}
                    onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 disabled:opacity-40"
                  >
                    Previous
                  </button>

                  {currentQuestionIndex < quizQuestions.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                      className="px-5 py-2 rounded-xl bg-cyan-600 text-white text-xs font-bold hover:bg-cyan-700 transition-colors"
                    >
                      Next Question &rarr;
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmitQuiz}
                      className="px-6 py-2 rounded-xl bg-teal-600 text-white text-xs font-bold hover:bg-teal-500 shadow-md transition-colors"
                    >
                      Submit Exam
                    </button>
                  )}
                </div>
              </div>
            ) : (
              /* Quiz Result Screen */
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <Award className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-[#102A43]">Assessment Completed!</h3>
                  <p className="text-xs text-slate-500 mt-1">Your responses have been archived in your official IMD LMS docket.</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 max-w-xs mx-auto">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Your Score</span>
                  <span className="text-3xl font-black text-[#2457C5]">{quizScore} / 100</span>
                  <p className="text-xs font-semibold text-emerald-700 mt-1">
                    {quizScore >= 75 ? 'Passed with High Distinction' : 'Satisfactory Performance'}
                  </p>
                </div>

                <button
                  onClick={() => setActiveQuiz(null)}
                  className="px-6 py-2.5 rounded-xl bg-[#102A43] text-white text-xs font-bold hover:bg-slate-800 transition-colors"
                >
                  Return to Assessments
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
