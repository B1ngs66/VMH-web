import type { Locale } from "./site";

export type ProjectSource = {
  label: string;
  url: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  lead: string;
  mark: string;
  sections: Array<{
    title: string;
    paragraphs: string[];
  }>;
  sources: ProjectSource[];
};

const projectsByLocale: Record<Locale, Project[]> = {
  zh: [
    {
      slug: "mokenlogic-harness",
      title: "MokenLogic Harness",
      category: "人工智能與持續學習",
      summary: "面向持續學習的 macOS 智能體環境，將長期專案狀態與應用程式、瀏覽器工作階段、檔案和工具連接起來。",
      lead: "MokenLogic Harness 讓智能體在多次任務之間保留可追溯的專案狀態，並把執行過程、工具操作和狀態更新置於可檢查的工作流程中。",
      mark: "ML",
      sections: [
        {
          title: "產品定位",
          paragraphs: [
            "Harness 是 MokenLogic 面向持續學習推出的原生產品介面，目前提供 macOS 預覽版。它不只處理單次對話，而是圍繞長期專案保存決定、約束、成果物及其來源。",
            "公開產品資料顯示，系統可連接原生應用程式、真實瀏覽器工作階段、檔案和工具，讓研究、排程、會議紀要與文件交付在同一工作環境中延續。",
          ],
        },
        {
          title: "持續學習與可檢查性",
          paragraphs: [
            "專案記憶以結構化狀態保存，而不是單純回放聊天紀錄。新任務只復原當前決策需要的內容，並保留來源以供核對。",
            "產品把意圖、上下文、工具動作、成果物和驗證結果連接成完整迴路，重要操作保留人工檢查點，持久狀態亦與基礎模型保持分離。",
          ],
        },
        {
          title: "與天機控股的關係",
          paragraphs: [
            "MokenLogic 官方資料將其列為天機控股有限公司旗下子公司。該項目體現集團在人工智能、長期記憶與智能體基礎設施方向的產品探索。",
          ],
        },
      ],
      sources: [
        { label: "MokenLogic Harness 官方網站", url: "https://mokenlogic.com/zh-hant/harness" },
      ],
    },
    {
      slug: "greater-bay-area-hunan-football-team",
      title: "大灣區湖南人足球隊",
      category: "體育 IP 與社群連接",
      summary: "以足球連接大灣區湘籍社群與湖南本地文化，探索體育 IP、城市交流及社群參與的長期價值。",
      lead: "大灣區湖南人足球隊以廣州、深圳為樞紐，面向在粵湘籍社群建立共同的體育文化連接，並以友誼賽形式參與湖南省足球聯賽相關活動。",
      mark: "湘",
      sections: [
        {
          title: "球隊背景",
          paragraphs: [
            "公開報道顯示，球隊於深圳成立，聯動湖南多個市州，並經相關程序同意以友誼賽形式參與 2025 湖南省足球聯賽活動。球隊以鄉情和足球為紐帶，連接大灣區湘籍人士與湖南家鄉。",
            "球隊參與不只限於賽事本身，也涵蓋球迷互動、城市交流和社群活動，為區域體育文化合作提供新的載體。",
          ],
        },
        {
          title: "天機控股的支持",
          paragraphs: [
            "天機控股於 2026 年 6 月 23 日發布自願公告，披露集團與球隊發起方深圳市小灣體育文化有限公司簽訂投資意向書，擬以人民幣 300 萬元增資，目標持股比例不低於 34%。",
            "該公告所述安排屬投資意向，仍以正式協議及相關條件為準。本頁據此呈現集團對球隊及體育 IP 發展方向的支持，不將意向交易表述為已完成投資。",
          ],
        },
        {
          title: "合作方向",
          paragraphs: [
            "集團期望以賽事內容、社群參與和區域文化為基礎，支持球隊建立可持續的體育 IP，並探索品牌合作、數字內容及大灣區與湖南之間的長期互動。",
          ],
        },
      ],
      sources: [
        { label: "天機控股自願公告：投資意向書", url: "/form/2026062300645_c.pdf" },
        { label: "央視網：大灣區湖南人足球隊亮相 2025 湘超", url: "https://local.cctv.com/2025/12/06/ARTIZg6vpTUThZlzdy322Dnl251206.shtml" },
      ],
    },
    {
      slug: "dolphinode",
      title: "Dolphinode",
      category: "數字技術、數字資產與全球商業化",
      summary: "由天機控股孵化的數字技術與商業化服務公司，以同一團隊提供技術研發、市場增長及長期營運服務。",
      lead: "Dolphinode 將策略、產品、數字基礎設施、數字資產、市場啟動與全球商業化納入同一服務體系，支持創新業務從構建走向規模化。",
      mark: "DN",
      sections: [
        {
          title: "一體化服務模式",
          paragraphs: [
            "Dolphinode 不止於提供單一技術開發服務，而是由同一團隊統一規劃技術、市場與營運。服務路徑由發掘機會、設計生態、技術構建及數字資產方案，延伸至市場啟動與規模化拓展。",
            "其能力範圍包括數字化策略與生態設計、技術與基礎設施、數字資產、產品創新、市場增長及全球商業化。",
          ],
        },
        {
          title: "產品與技術實踐",
          paragraphs: [
            "Dolphinode 公開展示 Dolphinet、NodeVault、WhimLand、WhimPartner 及 WhimPay 等互聯產品，覆蓋 EVM 兼容網絡、錢包、消費應用、商戶流程和支付接入。",
            "這套產品組合用於驗證基礎設施、資產、用戶體驗與商業營運如何在同一架構中協同；涉及受監管服務時，由具備相應授權的機構提供。",
          ],
        },
        {
          title: "與天機控股的關係",
          paragraphs: [
            "Dolphinode 官方網站明確標示其由天機控股孵化。該項目承接集團在數字技術、數字資產、IP 生態營運和全球商業化方向的能力建設。",
          ],
        },
      ],
      sources: [
        { label: "Dolphinode 官方網站", url: "https://www.dolphinode.world/zh-hant" },
      ],
    },
  ],
  en: [
    {
      slug: "mokenlogic-harness",
      title: "MokenLogic Harness",
      category: "AI and continual learning",
      summary: "A macOS agent environment for continual learning that connects long-lived project state with applications, browser sessions, files and tools.",
      lead: "MokenLogic Harness enables agents to retain traceable project state across tasks while keeping execution, tool actions and state updates inspectable.",
      mark: "ML",
      sections: [
        {
          title: "Product position",
          paragraphs: [
            "Harness is MokenLogic's native interface for continual learning and is currently available as a macOS preview. It is designed around long-running projects, preserving decisions, constraints, deliverables and their sources rather than treating every task as an isolated conversation.",
            "The public product material describes connections to native applications, real browser sessions, files and tools so that research, scheduling, meeting notes and document delivery can continue in one working environment.",
          ],
        },
        {
          title: "Continual learning and inspection",
          paragraphs: [
            "Project memory is retained as structured state rather than a replay of chat history. New tasks recover only the context required for the current decision and preserve source information for review.",
            "The product connects intent, context, tool actions, deliverables and validation in one loop, with review points for consequential actions and separation between persistent state and the underlying model.",
          ],
        },
        {
          title: "Relationship with VMH",
          paragraphs: [
            "MokenLogic's official materials identify the company as a subsidiary of VM Holding Company Limited. The project reflects the Group's product exploration in AI, long-term memory and agent infrastructure.",
          ],
        },
      ],
      sources: [
        { label: "MokenLogic Harness official website", url: "https://mokenlogic.com/harness" },
      ],
    },
    {
      slug: "greater-bay-area-hunan-football-team",
      title: "Greater Bay Area Hunan Football Team",
      category: "Sports IP and community",
      summary: "Connecting Hunan communities in the Greater Bay Area with local culture through football, sporting participation and regional exchange.",
      lead: "Based in the Guangzhou and Shenzhen area, the team provides a shared sporting identity for Hunan communities in Guangdong and has participated in activities linked to the Hunan Provincial Football League through friendly matches.",
      mark: "湘",
      sections: [
        {
          title: "Team background",
          paragraphs: [
            "Public reports state that the team was established in Shenzhen, connects communities from Hunan's municipalities and was approved to participate in activities related to the 2025 Hunan Provincial Football League through friendly matches.",
            "Its activities extend beyond match play to supporter engagement, regional exchange and community participation, creating a platform for sporting and cultural connections between the Greater Bay Area and Hunan.",
          ],
        },
        {
          title: "VMH support",
          paragraphs: [
            "On 23 June 2026, VMH published a voluntary announcement disclosing a letter of intent with Shenzhen Xiaowan Sports Culture Co., Ltd., the team's initiating entity. The proposed RMB 3 million capital contribution targets an equity interest of no less than 34%.",
            "The disclosed arrangement remains a proposed transaction subject to definitive agreements and relevant conditions. This page therefore describes VMH's support for the team and sports IP direction without presenting the proposed investment as completed.",
          ],
        },
        {
          title: "Direction of collaboration",
          paragraphs: [
            "VMH aims to support the development of sustainable sports IP through match content, community participation and regional culture, while exploring brand collaboration, digital content and long-term engagement between the Greater Bay Area and Hunan.",
          ],
        },
      ],
      sources: [
        { label: "VMH voluntary announcement: Letter of Intent", url: "/form-en/2026062300644.pdf" },
        { label: "CCTV report on the team and the Hunan league", url: "https://local.cctv.com/2025/12/06/ARTIZg6vpTUThZlzdy322Dnl251206.shtml" },
      ],
    },
    {
      slug: "dolphinode",
      title: "Dolphinode",
      category: "Digital technology, digital assets and global commercialisation",
      summary: "A digital technology and commercialisation services company incubated by VMH, combining technology development, market growth and long-term operations in one team.",
      lead: "Dolphinode brings strategy, products, digital infrastructure, digital assets, market activation and global commercialisation into one service system, supporting innovative businesses from build to scale.",
      mark: "DN",
      sections: [
        {
          title: "Integrated delivery model",
          paragraphs: [
            "Dolphinode goes beyond standalone technology development by planning technology, market and operations through one team. Its operating path moves from opportunity discovery and ecosystem design to technology development and digital-asset solutions, market activation and scale.",
            "Its published capabilities cover digital strategy and ecosystem design, technology and infrastructure, digital assets, product innovation, market growth and global commercialisation.",
          ],
        },
        {
          title: "Product and technology practice",
          paragraphs: [
            "Dolphinode presents an interconnected portfolio including Dolphinet, NodeVault, WhimLand, WhimPartner and WhimPay across EVM-compatible networks, wallet infrastructure, consumer applications, merchant workflows and payment access.",
            "The portfolio demonstrates how infrastructure, assets, user experience and commercial operations can work within one architecture. Regulated services are provided by appropriately licensed institutions where required.",
          ],
        },
        {
          title: "Relationship with VMH",
          paragraphs: [
            "Dolphinode's official website identifies it as incubated by VMH. The project supports the Group's capability development in digital technology, digital assets, IP ecosystem operations and global commercialisation.",
          ],
        },
      ],
      sources: [
        { label: "Dolphinode official website", url: "https://www.dolphinode.world/en" },
      ],
    },
  ],
};

export const projectSlugs = projectsByLocale.zh.map((project) => project.slug);

export function getProjects(locale: Locale) {
  return projectsByLocale[locale];
}

export function getProject(locale: Locale, slug: string) {
  return getProjects(locale).find((project) => project.slug === slug);
}
