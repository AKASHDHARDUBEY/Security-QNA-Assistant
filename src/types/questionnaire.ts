export interface QuestionnaireEntry {
  question: string;
  answer: string;
  confidence: number;
  references: string[];
}

export const securityQuestionnaire: Record<string, QuestionnaireEntry> = {
  "data_collection_notice": {
    question: "Are consumers informed about what data is processed by your organisation at every data collection checkpoint? Is the information easily accessible?",
    answer: "Yes, consumers are informed at each collection checkpoint through clear notices. Information is easily accessible via the Privacy Policy link displayed during data collection.",
    confidence: 95,
    references: ["KL Entry #23", "Privacy Policy Section 2"]
  },
  "privacy_notice_content": {
    question: "Does your privacy notice contain the following information: (i) Categories of personal information, (ii) Purpose, (iii) Whether sold, (iv) Retention, (v) Consumer rights and exercise process?",
    answer: "Yes, all the specified elements are included in our Privacy Notice to ensure transparency and compliance with CPRA.",
    confidence: 90,
    references: ["KL Entry #45", "Privacy Notice Document, Para 4–9"]
  },
  "privacy_policy_updates": {
    question: "Is your privacy policy updated at least once in 12 months? How do you communicate the change to consumers?",
    answer: "Yes, the Privacy Policy is reviewed and updated annually. Consumers are notified via email alerts and updated website banners.",
    confidence: 92,
    references: ["KL Entry #46", "Policy Update SOP Document"]
  },
  "personal_info_sale": {
    question: "Do you sell consumer personal information? If yes, do you notify the consumers about it?",
    answer: "No, we do not sell consumer personal information.",
    confidence: 98,
    references: ["Privacy Policy Clause 5.1"]
  },
  "do_not_sell_page": {
    question: "If you sell or use sensitive personal information, do you have a page titled 'Do Not Sell or Share My Personal Information'?",
    answer: "Yes, a dedicated page exists on our website titled exactly as required.",
    confidence: 88,
    references: ["KL Entry #51", "Web Compliance Standards Doc"]
  },
  "sensitive_info_limit_page": {
    question: "If you collect sensitive personal information, do you have a page titled 'Limit the Use of My Sensitive Personal Information'?",
    answer: "Yes, we maintain this page to allow consumers to limit sensitive data usage.",
    confidence: 87,
    references: ["KL Entry #51", "Web Compliance Standards Doc"]
  },
  "consumer_rights_awareness": {
    question: "How are consumers made aware about their rights?",
    answer: "Through Privacy Policy, onboarding disclosures, and periodic communication emails.",
    confidence: 90,
    references: ["KL Entry #49", "Consumer Awareness Plan Doc"]
  },
  "rights_exercise_methods": {
    question: "How can consumers submit requests to exercise their rights?",
    answer: "Via a secure web form and a dedicated toll-free number listed in the Privacy Notice.",
    confidence: 93,
    references: ["Privacy Policy Section 8", "Consumer Rights Portal"]
  },
  "request_methods_count": {
    question: "Do you have at least 2 designated methods for consumers to submit requests?",
    answer: "Yes, via online form submission and toll-free hotline.",
    confidence: 94,
    references: ["Privacy Policy Section 8"]
  },
  "data_modification": {
    question: "How can consumers modify their data if inaccurate?",
    answer: "Consumers can request correction through their account settings or by contacting Data Privacy Support via provided channels.",
    confidence: 91,
    references: ["KL Entry #53", "Data Correction Policy"]
  },
  "data_deletion_process": {
    question: "What is your organization's process to delete data if requested?",
    answer: "Consumer submits a verified request. Data is then securely deleted across all storage locations and third-party systems within 45 days.",
    confidence: 92,
    references: ["Data Deletion SOP Document"]
  },
  "deletion_tat": {
    question: "Do you commit to data deletion Turnaround Time (TAT) ≤ 45 days (CPRA compliance)?",
    answer: "Yes, data deletion is completed within 45 days from request verification.",
    confidence: 95,
    references: ["Data Deletion SOP Document"]
  },
  "dsar_system": {
    question: "Do you have the infrastructure/process to single out an individual and report collected data categories, sources, and third-party disclosures?",
    answer: "Yes, through our Data Subject Access Request (DSAR) system integrated with CRM and data lakes.",
    confidence: 90,
    references: ["DSAR System Architecture Doc"]
  },
  "employee_training": {
    question: "Are all employees with access to sensitive data provided regular updates on relevant procedures, processes, and policies?",
    answer: "Yes, mandatory periodic training and update notifications are provided based on role and data access level.",
    confidence: 93,
    references: ["KL Entry #31", "Training & Awareness SOP"]
  },
  "sod_principle": {
    question: "Is the separation of duties principle employed for system access?",
    answer: "Yes, SoD is enforced for high-risk functions through role-based access and workflow approvals.",
    confidence: 95,
    references: ["KL Entry #34", "IAM Policy Doc"]
  },
  "least_privilege": {
    question: "Is the least privilege principle employed?",
    answer: "Yes, all access is granted strictly based on job function and reviewed regularly.",
    confidence: 96,
    references: ["KL Entry #35", "Least Privilege Implementation Doc"]
  },
  "access_provisioning": {
    question: "Is user access provisioning controlled through a defined and implemented process?",
    answer: "Yes, access requests require documented approvals and are tracked via IAM system.",
    confidence: 92,
    references: ["KL Entry #38", "Access Provisioning Policy"]
  },
  "access_reviews": {
    question: "Are access reviews and revalidations conducted regularly?",
    answer: "Yes, quarterly or risk-adjusted frequency based on asset criticality and user role.",
    confidence: 91,
    references: ["KL Entry #40", "Access Review SOP"]
  },
  "privileged_access_segregation": {
    question: "Is segregation of privileged access roles implemented and evaluated?",
    answer: "Yes, admin tasks, key management, and logging are functionally segregated.",
    confidence: 90,
    references: ["KL Entry #42", "Privileged Access Framework"]
  },
  "privileged_access_time_limit": {
    question: "Are privileged access roles time-limited?",
    answer: "Yes, privileged access is time-boxed and revoked automatically upon expiration.",
    confidence: 89,
    references: ["IAM Controls Documentation"]
  },
  "privilege_accumulation_prevention": {
    question: "Are procedures in place to prevent accumulation of segregated privileges?",
    answer: "Yes, SoD conflict detection and alerts are built into the IAM engine.",
    confidence: 90,
    references: ["KL Entry #44", "SoD Conflict Policy"]
  },
  "high_risk_access_governance": {
    question: "Are high-risk privileged access roles granted with customer participation (where applicable)?",
    answer: "Yes, for customer-facing environments, customer input is included in high-risk access governance.",
    confidence: 88,
    references: ["Access Governance Model Doc"]
  },
  "logging_infrastructure": {
    question: "Is logging infrastructure read-only for users with write/privileged access?",
    answer: "Yes, logs are stored in immutable storage (e.g., WORM) to prevent tampering.",
    confidence: 94,
    references: ["Logging & Monitoring SOP"]
  },
  "logging_configuration_control": {
    question: "Is disabling logging 'read-only' configuration controlled via SoD and break-glass procedures?",
    answer: "Yes, override access requires emergency approval and multi-party oversight.",
    confidence: 92,
    references: ["Break-Glass Access Control Procedure"]
  },
  "mfa_enforcement": {
    question: "Are MFA and least-privilege principles enforced for all access to sensitive systems and data?",
    answer: "Yes, MFA is mandatory for all high-privilege and sensitive data access.",
    confidence: 95,
    references: ["Authentication Policy"]
  },
  "access_verification": {
    question: "Is access verification for system and data functions regularly reviewed?",
    answer: "Yes, audit trails and automated reviews validate authorized usage.",
    confidence: 91,
    references: ["Access Validation SOP"]
  },
  "inter_environment_communication": {
    question: "Are inter-environment communications restricted to authenticated and authorized connections?",
    answer: "Yes, interconnections require VPN, TLS, and service-level authentication.",
    confidence: 92,
    references: ["Network Segmentation Policy"]
  },
  "network_config_review": {
    question: "Are network configurations reviewed annually?",
    answer: "Yes, firewall and network policies are reviewed and attested annually.",
    confidence: 93,
    references: ["Network Review Schedule"]
  },
  "service_protocol_justification": {
    question: "Is documented justification maintained for all allowed services, protocols, and ports?",
    answer: "Yes, exceptions require change management tickets and risk justification.",
    confidence: 91,
    references: ["KL Entry #60", "Network Controls Register"]
  },
  "cloud_migration_security": {
    question: "Are encrypted channels with approved protocols used during cloud migrations?",
    answer: "Yes, TLS 1.2+ or FIPS-compliant protocols are enforced for all migrations.",
    confidence: 93,
    references: ["Cloud Migration Security Guidelines"]
  },
  "network_defense": {
    question: "Are defense-in-depth techniques implemented against network attacks?",
    answer: "Yes, IDS/IPS, firewalls, and anomaly detection layers are active and tested.",
    confidence: 94,
    references: ["Network Defense Architecture"]
  },
  "audit_findings_management": {
    question: "Is a risk-based corrective action plan maintained for audit findings?",
    answer: "Yes, each finding has an action plan with owner, timeline, and status tracking.",
    confidence: 92,
    references: ["Audit Response Management SOP"]
  },
  "asset_change_risk": {
    question: "Are risk management procedures for asset changes established and maintained?",
    answer: "Yes, all changes undergo risk evaluation, regardless of asset ownership.",
    confidence: 90,
    references: ["Change Risk Policy"]
  },
  "policy_review": {
    question: "Are policies and procedures reviewed and updated annually?",
    answer: "Yes, all critical security policies are reviewed yearly by compliance leads.",
    confidence: 95,
    references: ["Document Lifecycle Management Policy"]
  },
  "external_risk_management": {
    question: "Are asset change risks managed internally and externally?",
    answer: "Yes, third-party changes follow the same risk evaluation and approval process.",
    confidence: 91,
    references: ["KL Entry #72", "External Vendor Risk Policy"]
  }
}; 