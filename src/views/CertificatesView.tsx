import React, { useState } from 'react';
import { 
  Award, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  ExternalLink, 
  Printer, 
  X, 
  Sparkles,
  QrCode,
  Calendar,
  CloudRain
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Certificate } from '../types';

interface CertificatesViewProps {
  certificates: Certificate[];
}

export const CertificatesView: React.FC<CertificatesViewProps> = ({ certificates = [] }) => {
  const safeCertificates = Array.isArray(certificates) ? certificates : [];
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const handleDownload = (cert: Certificate) => {
    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });

    // Open Certificate Modal
    setSelectedCert(cert);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Official MoES Credentials</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] tracking-tight">
            Earned Certifications &amp; WMO Badges
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            All certificates issued on Capacity Connect are backed by tamper-proof digital signatures from the India Meteorological Department Directorate and are permanently archived for promotion eligibility.
          </p>
        </div>
      </div>

      {/* Certificate Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {safeCertificates.map((cert) => (
          <div
            key={cert.id}
            className="rounded-3xl border-2 border-amber-200/80 bg-gradient-to-br from-amber-50/30 via-white to-white p-6 shadow-md hover:shadow-xl transition-all flex flex-col justify-between relative overflow-hidden"
          >
            {/* Background seal watermark */}
            <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full border-4 border-amber-500/10 pointer-events-none flex items-center justify-center">
              <Award className="w-24 h-24 text-amber-500/10" />
            </div>

            <div>
              {/* Top Banner */}
              <div className="flex items-center justify-between pb-4 border-b border-amber-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-xs">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-500 block">
                      Govt of India • MoES
                    </span>
                    <span className="text-xs font-bold text-[#102A43]">Verified Credential</span>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-200">
                  {cert.verificationId}
                </span>
              </div>

              {/* Certificate Title & Recipient */}
              <div className="py-4 space-y-2">
                <h3 className="text-lg font-bold text-[#102A43] leading-snug">
                  {cert.title}
                </h3>
                <p className="text-xs text-slate-600">
                  Awarded to <strong className="text-slate-900">{cert.recipientName}</strong> ({cert.recipientEmployeeId})
                </p>
                <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
                  <span>Issued: <strong>{cert.issueDate}</strong></span>
                  <span>•</span>
                  <span className="text-teal-700 font-bold">Grade: {cert.grade} ({cert.scorePercentage}%)</span>
                </div>
              </div>

              {/* Skills tags */}
              <div className="py-2">
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1.5">
                  Demonstrated Competencies:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {cert.skills.map((s) => (
                    <span key={s} className="text-[10px] font-semibold bg-white border border-slate-200 text-slate-700 px-2.5 py-1 rounded-md shadow-2xs">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Digitally Authenticated</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownload(cert)}
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#102A43] to-[#2457C5] hover:opacity-95 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Certificate</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ========================================================= */}
      {/* HIGH-FIDELITY OFFICIAL CERTIFICATE MODAL */}
      {/* ========================================================= */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden relative my-6">
            
            {/* Modal Controls */}
            <div className="bg-slate-100 p-3 border-b border-slate-200 flex items-center justify-between text-xs print:hidden">
              <span className="font-bold text-slate-700 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                Official MoES Document Viewer
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" /> Print / Save as PDF
                </button>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Certificate Canvas Representation */}
            <div className="p-8 sm:p-12 bg-gradient-to-b from-[#FAFBFD] to-white border-8 border-[#102A43] m-4 rounded-2xl relative shadow-inner text-center space-y-6">
              
              {/* Corner Ornaments */}
              <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-amber-500" />
              <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-amber-500" />
              <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-amber-500" />
              <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-amber-500" />

              {/* Gov Emblem & Header */}
              <div className="space-y-1">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#102A43] text-teal-400 flex items-center justify-center font-bold mb-2 shadow-sm">
                  <CloudRain className="w-6 h-6" />
                </div>
                <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#102A43]">
                  Government of India • Ministry of Earth Sciences
                </h4>
                <h5 className="text-[11px] font-bold text-[#2457C5] tracking-wider uppercase">
                  India Meteorological Department (IMD)
                </h5>
                <p className="text-[10px] text-slate-500">
                  National Capacity Building &amp; LMS Portal • Mission Karmayogi
                </p>
              </div>

              {/* Big Certificate Title */}
              <div className="py-2">
                <h2 className="text-2xl sm:text-3xl font-black text-[#102A43] tracking-tight uppercase font-serif">
                  Certificate of Competence
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-[#2457C5] via-amber-400 to-[#12A594] mx-auto mt-2 rounded-full" />
              </div>

              {/* Awarded Text */}
              <div className="space-y-2 max-w-lg mx-auto">
                <p className="text-xs text-slate-500 uppercase tracking-wider">This is to certify that</p>
                <h3 className="text-xl sm:text-2xl font-black text-[#2457C5] underline decoration-amber-400/80 decoration-2 underline-offset-4">
                  {selectedCert.recipientName}
                </h3>
                <p className="text-xs text-slate-600 font-medium">
                  {selectedCert.recipientRole} • Employee ID: {selectedCert.recipientEmployeeId}
                </p>
                <p className="text-xs text-slate-600 pt-2 leading-relaxed">
                  has successfully satisfied all rigorous theoretical, practical simulator, and operational nowcasting requirements in the specialized curriculum:
                </p>
                <p className="text-sm font-bold text-[#102A43] pt-1">
                  "{selectedCert.title}"
                </p>
              </div>

              {/* Grade & Verification Code */}
              <div className="inline-flex items-center gap-6 py-2 px-6 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Grade Awarded</span>
                  <span className="font-extrabold text-[#102A43]">{selectedCert.grade}</span>
                </div>
                <div className="w-px h-6 bg-slate-300" />
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Assessment Score</span>
                  <span className="font-extrabold text-teal-700">{selectedCert.scorePercentage}%</span>
                </div>
                <div className="w-px h-6 bg-slate-300" />
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Date of Issue</span>
                  <span className="font-extrabold text-slate-700">{selectedCert.issueDate}</span>
                </div>
              </div>

              {/* Dual Signatures & Digital Seal */}
              <div className="pt-6 grid grid-cols-3 items-end text-center border-t border-slate-200 max-w-xl mx-auto text-xs">
                <div>
                  <div className="font-serif italic font-bold text-slate-800 text-sm mb-1">
                    {selectedCert.signatureName}
                  </div>
                  <p className="text-[10px] font-bold text-slate-600 leading-tight">
                    {selectedCert.signatureTitle}
                  </p>
                </div>

                {/* Digital Stamp */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full border-2 border-dashed border-teal-600 flex flex-col items-center justify-center p-1 text-[8px] font-bold text-teal-800 uppercase tracking-tighter">
                    <ShieldCheck className="w-5 h-5 text-teal-600 mb-0.5" />
                    <span>IMD Verified</span>
                  </div>
                  <span className="text-[8px] font-mono text-slate-400 mt-1">{selectedCert.verificationId}</span>
                </div>

                <div>
                  <div className="font-serif italic font-bold text-slate-800 text-sm mb-1">
                    Dr. Rajeshwar Varma
                  </div>
                  <p className="text-[10px] font-bold text-slate-600 leading-tight">
                    Head of Training, CTI Pune
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
