export type Bilingual = {
  fr: string;
  en: string;
};

export type TextSection = {
  type: "text";
  text: Bilingual;
};

export type CodeSection = {
  type: "code";
  code: string;
  label?: string;
  caption?: Bilingual;
};

export type CalloutSection = {
  type: "callout";
  variant: "tip" | "warning" | "note";
  text: Bilingual;
};

export type LessonSection = TextSection | CodeSection | CalloutSection;

export type Exercise = {
  prompt: Bilingual;
  starterCode: string;
  solutionCode: string;
  hint: Bilingual;
  explanation: Bilingual;
};

export type LessonKind = "lesson" | "project";

export type Lesson = {
  id: string;
  kind?: LessonKind;
  slug: string;
  title: Bilingual;
  summary: Bilingual;
  sections: LessonSection[];
  exercise?: Exercise;
};

export type ModuleStatus = "available" | "planned";

export type Module = {
  id: string;
  slug: string;
  title: Bilingual;
  description: Bilingual;
  status: ModuleStatus;
  lessons: Lesson[];
};
