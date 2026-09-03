import type { Locale } from "./site";

export type LegalSection = {
  title: string;
  paragraphs?: string[];
  items?: string[];
};

type LegalDocument = {
  title: string;
  notice: string;
  sections: LegalSection[];
};

const privacyZh: LegalDocument = {
  title: "私隱資料收集聲明",
  notice: "重要：閣下使用本網站即表示同意當中所列出之責任及政策聲明。",
  sections: [
    {
      title: "私隱保護承諾",
      paragraphs: [
        "天機控股有限公司（下稱「本公司」）致力保障和維護閣下的網上私隱。本聲明遵照香港特別行政區法例第486章《個人資料（私隱）條例》之要求而發表，通知閣下我們收集個人資料的目的、用途及閣下的權利。",
        "如閣下使用本網站，即表示閣下允許個人資料按照本聲明的規定被使用。本公司可不時修訂本聲明，請定期查閱。",
      ],
    },
    {
      title: "資料的收集",
      paragraphs: ["當閣下填寫及提交網上表格、使用商務通或諮詢服務時，可能被要求提供以下個人資料："],
      items: ["姓名", "職務", "地址", "履歷", "電子郵件地址", "電話和傳真號碼"],
    },
    {
      title: "資料的目的及用途",
      items: [
        "監控本網站之日常運作及協助網站未來發展",
        "匯編統計資料以分析網站使用情況",
        "識別和核實使用本網站服務的用戶身份",
        "處理及跟進查詢、建議及投訴",
        "向用戶提供本公司資訊及行政事項通知",
        "作網絡保安發展和研究之用",
      ],
    },
    {
      title: "資料的傳遞和披露",
      paragraphs: [
        "本公司一般不會向第三方披露可辨識閣下身份的個人資料，除非得到閣下同意、由服務提供者協助提供服務，或法律要求我們向政府、司法或執法機關披露。",
        "如服務提供者位於香港以外地區，閣下自願提供個人資料即表示同意相關跨境傳輸。相關服務提供者須遵從所在地的私隱法規及政策。",
      ],
    },
    {
      title: "資料的存取",
      paragraphs: [
        "閣下有權要求查閱及更正本公司所收集的個人資料。如欲提出要求，請透過本網站所列的聯絡方式與私隱事務管理員聯繫。",
      ],
    },
  ],
};

const privacyEn: LegalDocument = {
  title: "Privacy policy",
  notice: "Important: By using this website, you agree to the responsibilities and policy statements set out below.",
  sections: [
    {
      title: "Privacy commitment",
      paragraphs: [
        "VM Holding Company Limited (the Company) is committed to protecting your online privacy. This statement is published in accordance with the Personal Data (Privacy) Ordinance (Chapter 486 of the Laws of Hong Kong) to explain why personal data is collected, how it is used and your rights.",
        "By using this website, you consent to personal data being used in accordance with this statement. The Company may update this statement from time to time.",
      ],
    },
    {
      title: "Data collection",
      paragraphs: ["When you submit an online form or use a consultation service, you may be asked to provide:"],
      items: ["Name", "Position", "Address", "Resume", "Email address", "Telephone and fax numbers"],
    },
    {
      title: "Purposes and use",
      items: [
        "Operate and improve this website",
        "Compile statistics for website usage analysis",
        "Identify and verify users of website services",
        "Process enquiries, suggestions and complaints",
        "Provide Company information and administrative notices",
        "Support network-security development and research",
      ],
    },
    {
      title: "Transfer and disclosure",
      paragraphs: [
        "The Company generally does not disclose identifiable personal data to third parties unless you consent, a service provider is engaged to help deliver a service, or disclosure is required by law to a government, judicial or law-enforcement authority.",
        "Where a service provider is located outside Hong Kong, your voluntary provision of personal data indicates consent to the relevant cross-border transfer. Providers must comply with the privacy laws and policies that apply to them.",
      ],
    },
    {
      title: "Access to data",
      paragraphs: [
        "You may request access to or correction of personal data held by the Company. Please contact the Privacy Officer using the contact details published on this website.",
      ],
    },
  ],
};

const termsZh: LegalDocument = {
  title: "使用條款",
  notice: "重要：閣下使用本網站即表示同意當中所列出之責任及政策聲明。",
  sections: [
    {
      title: "重要聲明",
      paragraphs: [
        "閣下使用本網站即表示同意當中所列出之責任及政策聲明。如閣下於條款修訂後仍繼續使用本網站，即視為接受有關修訂。",
        "本網站不擬向身處法律限制本公司發放此等資料之地區的人士提供資料。瀏覽人士必須自行了解及遵守有關限制。",
      ],
    },
    {
      title: "非投資要約、招攬或建議",
      paragraphs: [
        "本網站內容不構成任何投資、服務、投資產品或存款的要約、招攬或建議。網站資料亦不擬作為專業意見，瀏覽人士應在需要時尋求適當及獨立的專業意見。",
        "本公司可酌情撤回或修改網站內提供的資料、產品及服務而毋須事先通知。",
      ],
    },
    {
      title: "準確性和可靠性",
      paragraphs: [
        "本公司於編制網站資訊時已力求審慎，但資料按原有狀態提供，不作任何明示或暗示之保證或陳述。第三方提供之資料可能包括數據、報價、統計、新聞、研究及分析，本公司不保證其準確性、完整性、適當性或及時性。",
      ],
    },
    {
      title: "免責聲明",
      paragraphs: [
        "網站資料僅供參考，並不構成交易、招攬、邀請或要約。投資附帶風險，價值可升可跌，過往表現並不反映將來表現。進行投資前請尋求獨立專業意見。",
      ],
    },
    {
      title: "版權與知識產權",
      paragraphs: [
        "本公司及其他相關人士擁有本網站展示的商標、標誌及內容。未經書面同意，不得複印、分發、出版或以其他方式使用。",
      ],
    },
    {
      title: "連結及電郵通訊",
      paragraphs: [
        "使用連結前往第三方網站或資料來源的風險由閣下自行承擔。本公司不對第三方網站的準確性、內容或資料遺漏承擔責任。經互聯網傳送電郵亦不保證完全安全。",
      ],
    },
  ],
};

const termsEn: LegalDocument = {
  title: "Terms of use",
  notice: "Important: By using this website, you agree to the responsibilities and policy statements set out below.",
  sections: [
    {
      title: "Important statement",
      paragraphs: [
        "By using this website, you agree to these responsibilities and policy statements. Continued use after an amendment means that you accept the amended terms.",
        "This website is not intended for persons in jurisdictions where distribution of this information by the Company is restricted. Visitors are responsible for understanding and complying with applicable restrictions.",
      ],
    },
    {
      title: "No investment offer, solicitation or advice",
      paragraphs: [
        "Nothing on this website constitutes an offer, solicitation or recommendation concerning investments, services, investment products or deposits. The information is not professional advice. Visitors should obtain appropriate independent advice when required.",
        "The Company may withdraw or modify information, products or services on this website at any time without prior notice.",
      ],
    },
    {
      title: "Accuracy and reliability",
      paragraphs: [
        "The Company takes care when compiling website information, but all information is provided as is without express or implied warranty. Information supplied by third parties may include data, quotations, statistics, news, research and analysis. The Company does not warrant its accuracy, completeness, suitability or timeliness.",
      ],
    },
    {
      title: "Disclaimer",
      paragraphs: [
        "Website content is for reference only and does not constitute a transaction, solicitation, invitation or offer. Investments involve risk. Values may rise or fall and past performance does not indicate future performance. Obtain independent professional advice before investing.",
      ],
    },
    {
      title: "Copyright and intellectual property",
      paragraphs: [
        "The Company and relevant third parties own the trademarks, logos and content displayed on this website. Content may not be copied, distributed, published or otherwise used without written consent.",
      ],
    },
    {
      title: "External links and email",
      paragraphs: [
        "Use of links to third-party websites or information sources is at your own risk. The Company is not responsible for their accuracy, content or omissions. Email transmitted over the internet is not guaranteed to be secure.",
      ],
    },
  ],
};

export function getLegalDocument(locale: Locale, kind: "privacy" | "terms"): LegalDocument {
  if (kind === "privacy") return locale === "zh" ? privacyZh : privacyEn;
  return locale === "zh" ? termsZh : termsEn;
}

