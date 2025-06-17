// Example grouped system messages for chat support
// Each group has a topic, keywords, and possible replies

export const systemMessageGroups = [
  {
    topic: "appointment booking",
    keywords: ["book", "appointment", "schedule", "doctor", "visit"],
    replies: [
      "To book an appointment, go to the Book Appointment page and select your preferred doctor and time.",
      "You can schedule a visit by clicking on 'Book Appointment' in the sidebar.",
      "If you need help booking, let me know your preferred doctor and date."
    ]
  },
  {
    topic: "prescription",
    keywords: ["prescription", "medicine", "drug", "refill", "medication"],
    replies: [
      "You can view your prescriptions in the Prescriptions section.",
      "For a refill, please contact your doctor or use the prescription request feature.",
      "If you have questions about your medication, let me know."
    ]
  },
  {
    topic: "wallet",
    keywords: ["wallet", "balance", "funds", "payment", "money", "add funds"],
    replies: [
      "You can check your wallet balance and add funds in the Wallet section.",
      "For payment issues, please provide more details.",
      "If you need to add funds, click 'Add Funds' in your wallet."
    ]
  },
  {
    topic: "support",
    keywords: ["help", "support", "problem", "issue", "contact"],
    replies: [
      "How can I assist you today?",
      "For support, please describe your issue in detail.",
      "You can also reach out to our support team via the Support section."
    ]
  },
  {
    topic: "profile",
    keywords: ["profile", "update", "edit", "change", "information"],
    replies: [
      "You can update your profile information in the Profile section.",
      "To change your details, go to Profile and click 'Edit'."
    ]
  },
  {
    topic: "cancel appointment",
    keywords: ["cancel", "remove", "delete", "appointment", "booking"],
    replies: [
      "To cancel an appointment, go to your Appointments section and select the appointment you wish to cancel.",
      "If you need help cancelling, please provide the appointment date and doctor.",
      "Appointments can be cancelled up to 24 hours before the scheduled time."
    ]
  },
  {
    topic: "reschedule appointment",
    keywords: ["reschedule", "change", "move", "appointment", "booking", "time", "date"],
    replies: [
      "To reschedule, go to your Appointments section and select 'Reschedule' for the relevant appointment.",
      "You can change your appointment date or time from the Appointments page.",
      "If you need help rescheduling, let us know your preferred new date and time."
    ]
  },
  {
    topic: "doctor information",
    keywords: ["doctor", "specialist", "find", "info", "information", "about", "profile"],
    replies: [
      "You can view doctor profiles and specialties in the Book Appointment section.",
      "To find a specialist, use the filter options in the Book Appointment page.",
      "If you need information about a specific doctor, please provide their name."
    ]
  },
  {
    topic: "insurance",
    keywords: ["insurance", "cover", "coverage", "policy", "claim"],
    replies: [
      "We accept several insurance providers. Please check the Insurance section for details.",
      "To use your insurance, provide your policy details during booking or at the hospital.",
      "For insurance claims, contact our billing department or support."
    ]
  },
  {
    topic: "test results",
    keywords: ["test", "results", "lab", "report", "blood", "scan"],
    replies: [
      "Test results are available in the Test Results section once processed.",
      "You will be notified when your lab reports are ready.",
      "For questions about your results, contact your doctor or support."
    ]
  },
  {
    topic: "hospital information",
    keywords: ["hospital", "location", "address", "hours", "contact", "phone", "emergency"],
    replies: [
      "Our hospital address and contact details are available in the Contact Us section.",
      "We are open 24/7 for emergencies. For general queries, see our website or call our main line.",
      "For directions or visiting hours, check the Hospital Info page."
    ]
  },
  {
    topic: "system guidance",
    keywords: ["how", "guide", "navigate", "use", "help", "instruction", "manual", "steps", "where", "find", "access"],
    replies: [
      "To navigate the system, use the sidebar to access different sections such as Dashboard, Appointments, Book Appointment, Prescriptions, and more.",
      "If you are unsure where to find a feature, try using the sidebar menu or ask me directly for guidance.",
      "For step-by-step instructions, let me know what you want to do (e.g., book an appointment, view test results, update your profile).",
      "You can always return to the Dashboard for an overview and quick links to all main features.",
      "If you need a user manual or further help, visit the Help or Support section."
    ]
  }
];
