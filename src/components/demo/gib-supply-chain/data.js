// Content transcribed from gibsupplychain.com in November 2026. Private prospect demo.
export const base = '/demo/gib-supply-chain';
export const links = {
  "site": "https://www.gibsupplychain.com",
  "demo": "https://www.gibsupplychain.com/gib-platform#demo",
  "resources": "https://www.gibsupplychain.com/gib-insights",
  "caseStudies": "https://www.gibsupplychain.com/gib-insights/tag/case-studies",
  "webinars": "https://www.gibsupplychain.com/webinars/sap-mrp-parameters-safety-stock",
  "portal": "https://portal.ifm-business-solutions.com/en/",
  "community": "https://www.gibsupplychain.com",
  "privacy": "https://www.gibsupplychain.com",
  "caseTE": "https://www.gibsupplychain.com/gib-insights/preparing-for-sap-s4hana-how-te-connectivity-standardized-supply-chain-operations",
  "caseFFF": "https://www.gibsupplychain.com/gib-insights/how-fff-enterprises-reduced-manual-procurement-work-in-sap-by-150-hours-per-month",
  "caseMolex": "https://www.gibsupplychain.com/gib-insights/how-molex-restored-execution-visibility-in-sap-after-moving-planning-to-kinaxis",
  "caseAgilent": "https://www.gibsupplychain.com/gib-insights/enterprise-class-demand-planning-at-agilent-technologies",
  "operationsVideo": "https://player.vimeo.com/video/1055307014"
};
export const products = {
  "forecast": {
    "slug": "forecast",
    "name": "GIB Forecast",
    "category": "Demand Planning",
    "verb": "Plan",
    "summary": "Turn demand signals into supply decisions that flow straight into MRP without offline reconciliation.",
    "features": [
      "Dozens of statistical forecast models",
      "Automated best-fit model selection",
      "Forecast simulation & parameter testing",
      "Planning accuracy monitoring",
      "Campaign & top-down/bottom-up planning"
    ],
    "popular": false,
    "tabShot": "gxf-seasonal-en.png",
    "hero": "hero-forecast.png",
    "tagline": "Demand Intelligence Built Directly into SAP",
    "intro": [
      "Improve forecast accuracy and align demand signals inside your live SAP environment.",
      "GIB Forecast is the engine behind a reliable, consensus-driven demand planning process. It delivers the visibility, statistical intelligence, and structural discipline needed to generate accurate forecasts, manage lifecycle changes, and continuously improve planning performance directly within your SAP environment."
    ],
    "heroQuote": {
      "text": "Before human staff gets involved, automated processes have loaded the data and then run forecast models and outlier analysis against it. They just show up and can start actually doing value-added tasks of getting the data right. [...] There's full transparency now between what the demand planner is doing with the data and what the actual planner , a production planner for example , is going to do to execute that plan.",
      "name": "Ross Fasco",
      "role": "SAP Supply Chain Architect at Agilent Technologies"
    },
    "capabilitiesHeading": "Build, Evaluate, and Adjust Forecasts",
    "capabilitiesSub": "with a transparent, data-driven, and business-controlled planning process",
    "capabilities": [
      {
        "title": "Establish Complete Forecast Transparency",
        "text": "GIB Forecast provides full transparency into how forecast values are generated, adjusted, and transferred across versions, hierarchies, and time horizons. Planners can compare historical actuals, statistical results, manual corrections, and consensus values in one structured view. Trend patterns, seasonality, and structural demand shifts become visible across planning levels , from aggregated turnover planning down to individual material detail.",
        "shot": "scx-demand-planning-sheet-1280x720-en.png"
      },
      {
        "title": "Optimize Forecast Performance Over Time",
        "text": "Forecast quality is measured before it impacts inventory, procurement, and production decisions. GIB evaluates multiple statistical models , including seasonal methods, Croston for intermittent demand, and regression approaches , and scores them using established error metrics such as MAD, RMSE, tracking signal, and WMAPE. Smooth demand, seasonal products, and intermittent spare parts are treated differently to avoid systematic distortion and bias. Planners can objectively select the best-fit model per material or hierarchy and monitor bias and volatility over time. Instead of relying on static parameters, forecast logic is continuously validated against real performance.",
        "shot": "gxf-seasonal-en.png"
      },
      {
        "title": "Enable Continuous Forecast Accuracy Control",
        "text": "Not all demand behaves the same and GIB ensures planning logic reflects that reality. High-variance items are clearly surfaced so planners can focus attention where forecast risk is greatest. Rather than reviewing everything equally, planning effort is directed toward what truly drives variability and service exposure. Materials can be segmented using ABC/XYZ or custom classifications to differentiate stable, volatile, seasonal, or intermittent patterns.",
        "shot": "comparison-matrix-variance-and-outlier-review.png"
      },
      {
        "title": "Orchestrate Product Lifecycle Transitions",
        "text": "Forecasting adjustments and lifecycle events are managed directly within SAP. Structured phase-in and phase-out controls guide product transitions, while version-based planning enables scenario comparison without overwriting core data. Manual adjustments are visible and governed, and hierarchy-based coordination ensures alignment across regions, product lines, and organizational levels.",
        "shot": "forecast-landingpage-phaseinout-en.png"
      },
      {
        "title": "Control Forecast Hierarchies and Versions at Scale",
        "text": "Forecasting operates across structured hierarchies , from product groups down to individual materials, plants, and regions. Multiple versions allow statistical baselines, consensus adjustments, and approved forecasts to coexist in a controlled framework. Decisions remain traceable and aligned.",
        "shot": "gxf-demand-segmentation-en.png"
      }
    ],
    "stats": [
      {
        "value": 113,
        "prefix": "",
        "suffix": "%",
        "label": "increase in forecast accuracy"
      },
      {
        "value": 45,
        "prefix": "",
        "suffix": "%",
        "label": "reduction in planning time, effort, and expense"
      },
      {
        "value": 4,
        "prefix": "",
        "suffix": " months",
        "label": "for return on investment"
      },
      {
        "value": 16,
        "prefix": "",
        "suffix": "%",
        "label": "reduction in open PO value"
      }
    ],
    "quotes": [
      {
        "text": "Integration was a priority for us when picking a new forecast tool and GIB had that covered. Automatic model selection with clear audit-ability was a must. It was critical that we picked a system that we could actually review a forecast at a part number level and see what was driving the model. Our previous forecasting tool only offered one forecast model and we could adjust the weight of seasonality. Sharing a forecast dollar value with our sales team and finance has helped with AOP planning and ensuring our forecast direction is in alignment with market conditions. The tool has been very user friendly.",
        "name": "Forecasting Analyst",
        "role": "Manufacturer | $5B+ Annual Revenue"
      },
      {
        "text": "The demand planning module is much more flexible and user friendly than standard SAP processes. Users can work independently to quickly manage the demand of their applicable business segment. Secondary to the demand planning module, the support team with GIB has been extremely helpful with our continued success in using the GIB suite.",
        "name": "Business Analyst",
        "role": "Consumer Goods | $1B+ Annual Revenue"
      },
      {
        "text": "We have achieved all the primary goals outlined in the project plan with regard to increasing efficiency within merchandise planning (goods procurement and demand planning) and reducing storage costs.",
        "name": "Head of Supply Chain Management",
        "role": "MIGROS | Food & Grocery Retailer"
      }
    ],
    "closingHeading": "GIB Forecast at a glance",
    "closing": [
      "Hierarchy-based planning across plants, regions, and products",
      "Embedded statistical engines and lifecycle controls",
      "Transparent model performance and error measurement",
      "Forecast discipline that scales across your supply chain organization"
    ]
  },
  "inventory": {
    "slug": "inventory",
    "name": "GIB Inventory",
    "category": "Inventory Optimization",
    "verb": "Optimize",
    "summary": "Right-size stock across plants and DCs to protect service while freeing working capital.",
    "features": [
      "Target stock calculation",
      "ABC/XYZ classification",
      "Rule-based inventory control",
      "Dynamic inventory key figure calculation",
      "Replenishment lead time calculation"
    ],
    "popular": false,
    "tabShot": "gib-inventory-abc-xyz-classification-and-product-life-cycle-in-sap.png",
    "hero": "hero-inventory.png",
    "tagline": "Inventory Control Built Directly into SAP",
    "intro": [
      "Align safety stock, service targets, and replenishment logic inside SAP.",
      "GIB Inventory is the inventory control layer for SAP ECC and SAP S/4HANA. It analyzes historical material movements to calculate stock, consumption, and variability metrics, classifies materials based on value and demand variability, and assigns MRP and service level logic systematically. Instead of relying on static master data settings, planners can evaluate coverage against replenishment lead time, simulate parameter changes before execution, and apply approved updates directly within SAP."
    ],
    "heroQuote": {
      "text": "By using GIB Inventory and GIB Operations , we have sped up our material planning processes by more than 67%. We have been able to reduce our scrapping by 73% - the interaction with GIB Forecast has played a significant role here - and last but not least, we have been able to increase our delivery readiness by 3%.",
      "name": "Mehmet Kozan",
      "role": "Manager, Supply Chain Management at Baier & Schneider (Brunnen)"
    },
    "capabilitiesHeading": "Continuously Monitor Inventory Performance",
    "capabilitiesSub": "with complete control over your inventory strategy",
    "capabilities": [
      {
        "title": "Establish Inventory Transparency",
        "text": "GIB analyzes SAP material document history (movement data) to build statistically accurate inventory key figures across defined time horizons. Metrics such as stock value, average stock, slow movers, dead stock, and consumption variability are calculated directly from historical movements.\n\nInstead of reviewing what inventory looks like today, planners see how inventory behaves across plants, MRP areas, and Controlling Groups over time. Controlling Groups are categorically unique material groupings where different MRP strategies can be applied. These groupings are defined using different combinations of SAP material master fields and can vary by plant.",
        "shot": "gib-inventory-slow-mover-x-controlling-groups.png"
      },
      {
        "title": "Classify Materials Based on Value, Variability, and Lifecycle",
        "text": "Through ABC, XYZ, and Product Life Cycle (LRODI) classification, GIB segments materials based on consumption value, demand regularity, and lifecycle stage. Classification logic is maintained centrally and applied consistently across plants or Controlling Groups.\n\nPlanning strategies are then aligned to these classifications. For example, stable high-volume materials follow different safety stock and replenishment logic than irregular or slow-moving items. This prevents uniform planning rules from creating excess inventory or service risk.",
        "shot": "gib-inventory-abc-xyz-classification-and-product-life-cycle-in-sap.png"
      },
      {
        "title": "Set MRP and Service Levels by Material Classification",
        "text": "GIB allows you to assign MRP parameters and service levels based on ABC/XYZ classification and Controlling Group.\n\nInstead of changing safety stock, MRP type, lot size, or service level one material at a time, you define the rules once in the GIB MRP Parameters matrix and GIB Service Level matrix. For example, A/X materials can follow one planning logic, while C/Z materials follow another.\n\nThese rules are then applied consistently across all materials in that category. The defined service levels are used in both simulation and MRP matching, so calculated safety stock values and replenishment behavior follow the planning strategy you’ve set. This reduces manual master data maintenance and ensures proper inventory alignment with demand.",
        "shot": "gib-inventory-maintain-mrp-parameters-and-service-level.png"
      },
      {
        "title": "Stabilize Replenishment and Coverage Logic",
        "text": "Replenishment Lead Time (RLT) is calculated using defined priority logic and compared to forward-looking Range of Coverage (RoC). This makes it possible to identify materials where coverage is too short relative to replenishment time, or excessively long relative to demand. Inventory availability is evaluated using days of supply versus actual lead time performance , not stock quantity alone.\n\nFor example, if a material has 10-20 days of supply but requires 51-60 days to replenish based on the RLT, then it is immediately flagged as a supply risk (red section). Materials are positioned within a structured RoC matrix, allowing planners to identify exposure at a glance and drill into detailed analysis directly within SAP.",
        "shot": "gib-inventory-roc-with-rlt-matrix.png"
      },
      {
        "title": "Simulate Inventory and Service-Level Adjustments",
        "text": "Planners can simulate changes to safety stock levels, service targets, lot sizes, and reorder logic without immediately updating SAP master data. The impact on coverage, stock value, and MRP proposals can be reviewed before parameters are transferred. This allows adjustments to be tested and validated before they affect live planning runs.",
        "shot": "dcc-simulation-service-levels.png"
      },
      {
        "title": "Match and Apply Corrected Parameters to SAP Master Data (MRP Matching)",
        "text": "GIB compares recalculated MRP parameters , including safety stock, lot-sizing procedures, MRP types, and service levels , against existing SAP material master data. Differences between current and proposed values are clearly identified, allowing planners to review and approve adjustments before they are written back. Updates follow a controlled process aligned with defined policy rules, ensuring parameter changes are deliberate and consistent across materials.",
        "shot": "gib-inventory-mrp-parameter-matching.png"
      }
    ],
    "stats": [
      {
        "value": 40,
        "prefix": "",
        "suffix": "%",
        "label": "inventory reduction in 11 months"
      },
      {
        "value": 2.7,
        "prefix": "USD ",
        "suffix": "M",
        "label": "reduction in inventory while maintaining service levels"
      },
      {
        "value": 140,
        "prefix": "EUR ",
        "suffix": "M",
        "label": "inventory reduction in 12 months"
      },
      {
        "value": 6,
        "prefix": "",
        "suffix": " months",
        "label": "ROI achieved"
      }
    ],
    "quotes": [
      {
        "text": "We urgently needed a solution that would provide us with the necessary stock transparency by first identifying slow movers and determining dead stocks, second performing ABC/XYZ analysis quickly and reliably - until now we had been using Microsoft Excel for this - and third, reliably checking the level of safety stocks and reorder points. [...] GIB makes it easy to meet our customers' requirements as precisely as possible and at the same time always be at the cutting edge of technology.",
        "name": "Linda Wismeth",
        "role": "Materials Management & Analytics | BHS Corrugated"
      },
      {
        "text": "Stock value fell from 62M€ to 54M€ over an 18-month period - the main contributor was GIB.",
        "name": "Gunnar Glavey",
        "role": "Head of Tactical and Commercial Planning | Airbus"
      },
      {
        "text": "Thanks to company-wide visibility, the GIB Inventory module now supports inventory-optimized purchasing decisions and has significantly improved our delivery reliability.",
        "name": "Udo Wessbecher",
        "role": "Head of IT, Supply Chain Management | ZF"
      },
      {
        "text": "The deciding factor for our choice of GIB Operations and GIB Inventory modules were, on one hand, the comparison that made it glaringly obvious to us how much we needed such a solution, and on the other hand, the consistent data transparency that this add-on ensures.",
        "name": "Industrial Machinery Manufacturer",
        "role": "+6B Revenue | 10,000+ Headcount"
      }
    ],
    "closingHeading": "The Inventory Control Layer for SAP",
    "closing": [
      "Validate safety stock buffers using real consumption variability and lead time deviation",
      "Recalculate replenishment lead time (RLT) based on actual supplier performance",
      "Classify materials using dynamic ABC/XYZ segmentation to align planning effort with value and demand behavior",
      "Simulate service level, safety stock, and replenishment adjustments before executing changes in ECC or S/4HANA"
    ]
  },
  "operations": {
    "slug": "operations",
    "name": "GIB Operations",
    "category": "Supply Chain Operations | MRP & Procurement",
    "verb": "Coordinate",
    "summary": "Catch shortages and exceptions early, then trigger the procurement or reschedule action in SAP.",
    "features": [
      "Comprehensive material position view",
      "Cross-plant transparency",
      "Exception grouping & prioritization",
      "Missing parts management",
      "Bundle POs and apply restrictions",
      "Cost, volume, and weight optimization"
    ],
    "popular": true,
    "tabShot": "gib-operations-dashboard-with-menu-options.png",
    "hero": "hero-operations.png",
    "tagline": "The Daily Decision Engine for MRP and Procurement in SAP",
    "intro": [
      "See what matters. Act immediately. Stay inside SAP.",
      "GIB Operations is the procurement and operational execution layer built directly into SAP ECC and SAP S/4HANA. It consolidates stock, requirements, planned orders, purchase orders, production orders, reservations, and supplier signals into a single workspace where planners can prioritize exceptions, manage shortages, evaluate supplier risk, and initiate procurement or rescheduling actions without leaving SAP."
    ],
    "heroQuote": {
      "text": "I've worked in SAP for over 20 years. The GIB tools are amazing. To me it is MD04 and MD07 on steroids. It does so much. I don't even know how to express how good. The great thing to us is it's in SAP; it does not use CIF like APO.",
      "name": "Mary Elwood",
      "role": "Lead Systems Analyst at Marathon Cheese"
    },
    "capabilitiesHeading": "Manage Execution Systematically Across the Supply Chain",
    "capabilitiesSub": "with a single cockpit for managing, prioritizing, and executing daily supply chain operations",
    "capabilities": [
      {
        "title": "See All Relevant MRP Data in One Screen",
        "text": "GIB consolidates stock, requirements, planned orders, purchase orders, and production orders into a single structured execution view. Instead of reviewing MD04 material by material, planners analyze demand and supply across multiple materials and plants in one list. Period-based columns and consumption history provide context for evaluating shortages and excess coverage across time.",
        "shot": "gib-operations-dashboard-with-menu-options.png"
      },
      {
        "title": "Prioritize Exception Messages and Coverage Risk by Operational Impact",
        "text": "Coverage is calculated based on current stock and incoming receipts. GIB shows how many days of demand are covered by stock alone, by the first planned receipt, and by the second planned receipt. If coverage falls below defined limits, the material is flagged in red or yellow. Planners can filter by plant, MRP controller, exception group, or vendor to focus on operational risk rather than scanning raw MRP output.",
        "shot": "define-traffic-lights-gib-operations.png"
      },
      {
        "title": "Monitor Supplier Performance and Delivery Risk",
        "text": "Supplier lead times are evaluated using actual goods receipt history. Delivery deviations between confirmed and actual dates are tracked and visualized. Recurring delays, irregular performance, and risk patterns are identified early, allowing planners to adjust replenishment strategies or initiate supplier discussions before shortages occur.",
        "shot": "gib-operations-monitor-vendors-and-deliveries.png"
      },
      {
        "title": "Identify and Manage Missing Parts Collectively",
        "text": "GIB detects component shortages and flags materials at risk due to insufficient supply. Instead of discovering missing parts during order conversion or production release, planners can see cross-material shortages in one list. Drill-down navigation allows users to trace shortages to specific orders and take corrective action directly within SAP. This allows planners to initiate procurement or reschedule activities before production or delivery is disrupted.",
        "shot": "gib-operations-missing-parts.png"
      },
      {
        "title": "Execute Planning and Procurement Actions Directly in SAP",
        "text": "Purchase requisitions can be converted to purchase orders directly from GIB. Planners can navigate to related sales orders, production orders, or purchase documents without leaving the cockpit. Relevant master data fields can be reviewed and adjusted, and simulations can be performed without immediately triggering MRP changes. Operational action is embedded within the same interface used for analysis.",
        "shot": "gib-operations-po-conversion-and-sales-orders-delivery.png"
      },
      {
        "title": "Coordinate Multi-Level and Project-Based Planning",
        "text": "GIB links project level demand to all dependent materials within the BOM structure. Planners can review whether stock and confirmed receipts exist for every required component, not just the finished good. If a lower-level material is short, the shortage is visible before project execution starts. This prevents incomplete builds and improves coordination across procurement and production.",
        "shot": "gib-operations-project-png.png"
      }
    ],
    "stats": [
      {
        "value": 42,
        "prefix": "",
        "suffix": " hr",
        "label": "reduction in manual effort per buyer per month"
      },
      {
        "value": 60,
        "prefix": "",
        "suffix": "%",
        "label": "fewer buyer overrides of MRP"
      },
      {
        "value": 75,
        "prefix": "",
        "suffix": "%",
        "label": "reduction in MRP noise"
      },
      {
        "value": 80,
        "prefix": "",
        "suffix": "%",
        "label": "faster order processing"
      }
    ],
    "quotes": [
      {
        "text": "Before, we had to go into MD07, go into each material in each warehouse individually and go into each purchase requisition to individually adjust. Then go into ME58 to convert reqs to a purchase order, drag and drop each req into the PO. With GIB, we can now select multiple products in multiple warehouses and adjust or delete reqs without having to leave the screen. Highlight the reqs you wish to convert and add them to a PO, or simply create individual PO's without ever leaving the screen.",
        "name": "Senior Manager, SAP Supply Chain",
        "role": "FFF Enterprises | Pharmaceutical Distribution"
      },
      {
        "text": "Before GIB, I had to create a file from CO24, connect it with an old file using VLOOKUP, and manually enter the relevant dates. Now I can open a current overview within one minute, see all relevant dates, and clearly identify critical parts. The missing part is now the issue , not the system.",
        "name": "Teresa Castro",
        "role": "Procurement Team Leader | Bosch Security & Safety Systems, KEENFINITY"
      },
      {
        "text": "Before GIB, creating POs consumed significant time. I had to run and download individual reports and invest time analyzing procurement items. Now I can place POs faster with one button, review stock, days of supply, consumption, and forecasts on one screen, and manage the daily workload more efficiently. GIB simplified our entire order release and follow up.",
        "name": "Procurement Team Member",
        "role": "Bosch Security & Safety Systems, KEENFINITY"
      },
      {
        "text": "Before GIB, I had to download reports from SAP, prepare an Excel layout to accommodate the data, and conduct manual simulations. Now I can simulate scenarios directly within GIB and reflect changes in a more streamlined and automated way.",
        "name": "Sofia Alvim",
        "role": "Senior Procurement Group Leader | Bosch Security & Safety Systems, KEENFINITY"
      }
    ],
    "closingHeading": "Daily Operational Control Embedded in SAP",
    "closing": [
      "Centralizes demand, supply, and execution signals across materials and plants",
      "Highlights what requires attention using coverage logic and business-relevant risk indicators",
      "Connects planning insight directly to execution transactions",
      "Improves coordination across planning, procurement, and production"
    ],
    "spotlight": {
      "eyebrow": "Customer spotlight",
      "title": "How FFF Enterprises Reduced Manual Procurement Work in SAP by 150+ Hours Per Month",
      "text": "FFF Enterprises was spending hours reconciling data across transactions, reports, and spreadsheets just to make purchasing decisions. With GIB Operations, the company eliminated more than 150 hours of manual effort each month, giving teams better visibility and control over inventory and supply decisions across its distribution network.",
      "href": "https://www.gibsupplychain.com/gib-insights/how-fff-enterprises-reduced-manual-procurement-work-in-sap-by-150-hours-per-month",
      "image": "case-fff.png"
    }
  },
  "production": {
    "slug": "production",
    "name": "GIB Production",
    "category": "Production Planning & Scheduling",
    "verb": "Schedule",
    "summary": "Schedule against real capacity , fewer changeovers, bottlenecks, and missed materials.",
    "features": [
      "Multi-resource planning",
      "Capacity sequencing",
      "Setup time optimization",
      "Bottleneck transparency",
      "Slot planning"
    ],
    "popular": false,
    "tabShot": "gib-gxm-drag-and-drop-scheduling.png",
    "hero": "hero-production.png",
    "tagline": "Capacity Planning and Scheduling Optimization Built Directly into SAP",
    "intro": [
      "Stop Losing Production Efficiency to Unstable Schedules",
      "GIB Production is the capacity planning and scheduling optimization layer built directly into SAP ECC and SAP S/4HANA. It helps production planners, schedulers, and plant leadership clearly see capacity constraints, material availability, and order priorities together so production decisions become faster, more consistent, and more effective."
    ],
    "heroQuote": {
      "text": "Our Production Materials Manager would not want to go back to the old system for any reason in the world, as the planning module in GIB has greatly simplified the planning process for the production lines and brought numerous benefits.",
      "name": "Massimo Moliterni",
      "role": "Supply Chain Manager at Schott"
    },
    "capabilitiesHeading": "Turn SAP Into a Reliable Production Planning Engine",
    "capabilitiesSub": "with built-in planning capabilities to evaluate production orders, capacity constraints, and material availability together",
    "capabilities": [
      {
        "title": "Monitor Capacity Utilization Across Work Centers",
        "text": "The dashboard consolidates capacity requirements, available capacity, backlog, and overload/underload thresholds into matrix and list views by work center and period (daily, weekly, monthly). Users can toggle between load, offer, remaining capacity, order quantity, and operation count views.\n\nColor-coded overload logic highlights red (over capacity) and green (available capacity) directly within the matrix. Capacity period views allow drill-down into exact orders driving overload.",
        "shot": "gxm-visualize-capacity-and-utilization.png"
      },
      {
        "title": "Schedule Directly Within a Drag-and-Drop Planning Table",
        "text": "Schedulers access a structured planning table where operations can be moved, sequenced, and reallocated across periods or work centers. Orders can be repositioned interactively based on real capacity availability.\n\nThe planning table connects production orders, planned orders, work center capacities, order pool, and area-specific layouts.",
        "shot": "gib-gxm-drag-and-drop-scheduling.png"
      },
      {
        "title": "Manage Shifts, Breaks, and Capacity Constraints",
        "text": "GIB allows planners to adjust working times, shift models, and operation durations directly within the scheduling view. Setup, machine, and labor times can be modified at the operation level, and non-working time or maintenance windows can be inserted without leaving the cockpit. Capacity adjustments immediately update the schedule, allowing planners to test realistic production scenarios and resolve overloads without separate configuration steps in SAP.",
        "shot": "gib-gxm-capacity-and-shift-management.png"
      },
      {
        "title": "Execute Production Actions Directly from the Schedule",
        "text": "GIB embeds production order management directly within the scheduling cockpit. Planners can convert planned orders, adjust capacity, run heuristics, deallocate operations, and review pegged requirements without navigating across multiple SAP transactions. Execution steps that typically require separate screens are consolidated into the scheduling environment, allowing planners to analyze impact and take corrective action in one continuous workflow.",
        "shot": "gib-gxm-dcp-execute-order-conversion.png"
      },
      {
        "title": "Manage Bulk, Container, and Pegged Orders in One View",
        "text": "GIB provides a consolidated view of pegged requirements and bulk or container order relationships. Planners can see how bulk production quantities are allocated to dependent materials, trace multi-level order linkages, and evaluate supply alignment across finished and semi-finished goods. This improves transparency in environments with packaging splits, container production, or shared bulk processes, reducing misallocation and improving execution reliability.",
        "shot": "gxm-dcp-bulk-container-and-pegged-orders-highlighted.png"
      }
    ],
    "stats": [
      {
        "value": 45,
        "prefix": "",
        "suffix": "%",
        "label": "faster planning cycles"
      },
      {
        "value": 50,
        "prefix": "",
        "suffix": "%",
        "label": "reduction in backorders"
      },
      {
        "value": 75,
        "prefix": "",
        "suffix": "%",
        "label": "reduction in material-related production disruptions"
      },
      {
        "value": 6,
        "prefix": "",
        "suffix": " weeks",
        "label": "ROI achieved"
      }
    ],
    "quotes": [
      {
        "text": "The cost savings we saw on label savings and the reduced changeovers gave us a payback in about 6 weeks.",
        "name": "GOJO, The Makers of Purell",
        "role": ""
      },
      {
        "text": "This software has improved my abilities leaps and bounds. It maximizes output and reduces time needed to analyze important data.",
        "name": "Senior Production Planner",
        "role": "Manufacturer | $500M+ Annual Revenue"
      },
      {
        "text": "Since our daily process flows are carried out on an international scale, the processes have to be optimally coordinated. The introduction of GIB has given us an improved overview of the current planning situation across different production sites. Since then, we've been able to react faster in critical phases and achieve better planning results.",
        "name": "Diana Pilz",
        "role": "Manager, Corporate Business Systems | R&M"
      }
    ],
    "closingHeading": "The Production Control Layer for SAP",
    "closing": [
      "Identify overload and capacity conflicts before they impact delivery",
      "Align available capacity with real shift patterns and constraints",
      "Optimize sequencing to reduce changeovers and increase throughput",
      "Improve schedule adherence before execution in ECC or S/4HANA"
    ],
    "outcomes": [
      {
        "title": "Improve Schedule Adherence",
        "text": "Evaluate capacity, material availability, and order priorities together directly within SAP."
      },
      {
        "title": "Increase Throughput",
        "text": "Stabilize schedules and improve the flow of orders across work centers."
      },
      {
        "title": "Optimize Capacity Utilization",
        "text": "Balance workloads across machines, labor, and production resources using live SAP planning data."
      },
      {
        "title": "Strengthen On-Time Delivery (OTD)",
        "text": "Align production schedules with real operational constraints before orders reach the shop floor."
      }
    ]
  }
};
export const faq = [
  {
    "q": "Is GIB a separate system? Does it replace SAP?",
    "a": "No. GIB runs directly inside SAP ECC and SAP S/4HANA, with all data and execution remaining within your SAP system. GIB does not replace SAP planning logic, MRP, or production functionality. Instead, it improves how effectively your live SAP system supports daily supply chain operations."
  },
  {
    "q": "Is GIB another planning engine?",
    "a": "No. GIB does not introduce a separate planning engine or external data layer. Teams work directly with live SAP data, allowing planning and operational decisions to translate into faster, more coordinated execution."
  },
  {
    "q": "How is GIB different from standard SAP functionality?",
    "a": "GIB improves how teams interpret and act on live SAP data. It helps organizations respond faster to supply chain signals, reduce corrective adjustments, and keep execution aligned across planning, procurement, inventory, and production."
  },
  {
    "q": "Does GIB require heavy customization or modification of SAP?",
    "a": "No. GIB is purpose-built for SAP and integrates within standard ECC and S/4HANA environments. It consumes your existing master data, transactional data, and authorization concepts, allowing organizations to improve supply chain performance without disrupting core SAP functionality or clean core principles."
  },
  {
    "q": "Is GIB relevant if we already use SAP IBP or other planning tools?",
    "a": "Yes. GIB ensures that planning signals , whether from SAP IBP or a third-party solution , translate into faster, more coordinated execution inside SAP."
  }
];
