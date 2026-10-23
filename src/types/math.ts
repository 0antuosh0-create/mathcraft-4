export type Language = 'en' | 'fa';
export type Theme = 'dark' | 'light';

export type Difficulty = 'Basic' | 'Intermediate' | 'Challenge' | 'آسان' | 'متوسط' | 'پیشرفته';

export type QuestionCategory = 
  | 'place_value'
  | 'compare_order'
  | 'rounding'
  | 'arguments'
  | 'mental_math'
  | 'estimation'
  | 'addition_multi_digit'
  | 'subtraction_regroup'
  | 'subtraction_zeros'
  | 'tape_diagram_modeling'
  | 'multiplication_tens'
  | 'error_critique';

export type VisualModelType = 
  | 'place_value_chart'
  | 'number_line'
  | 'tape_diagram'
  | 'vertical_addition'
  | 'vertical_subtraction';

export type VisualModelData =
  | { kind: 'place_value'; number: number; highlightedPlace?: string }
  | { kind: 'number_line'; min: number; max: number; target: number; step: number; roundedTo: number }
  | { kind: 'tape_diagram'; totalLabel: string; totalValue?: number | string; parts: Array<{ label: string; value: number | string; isUnknown?: boolean }> }
  | { kind: 'vertical_op'; op: '+' | '-'; num1: number; num2: number; num3?: number; steps?: string[] }
  | Record<string, unknown>;

export interface VisualModelConfig {
  type: VisualModelType;
  title: string;
  data: VisualModelData;
}

export interface Question {
  id: string;
  lessonId: string;
  unitId: string;
  title: string;
  titleFa?: string;
  prompt: string;
  promptFa?: string;
  category: QuestionCategory;
  difficulty: Difficulty;
  contextData?: {
    tableTitle?: string;
    tableTitleFa?: string;
    headers?: string[];
    headersFa?: string[];
    rows?: Array<Array<string | number>>;
    notes?: string;
  };
  visualModel?: VisualModelConfig;
  correctAnswer: string | number;
  correctAnswerFa?: string | number;
  options?: string[];
  optionsFa?: string[];
  explanation: string;
  explanationFa?: string;
  solutionSteps: string[];
  solutionStepsFa?: string[];
  pedagogicalTip: string;
  pedagogicalTipFa?: string;
  generatorId: string;
}

export interface Lesson {
  id: string;
  unitId: string;
  number: string;
  numberFa?: string;
  title: string;
  titleFa?: string;
  subtitle: string;
  subtitleFa?: string;
  conceptSummary: string;
  conceptSummaryFa?: string;
  detailedExplanation: string[];
  detailedExplanationFa?: string[];
  visualDemonstration: VisualModelConfig;
  rulesAndTips: string[];
  rulesAndTipsFa?: string[];
  commonPitfalls: {
    title: string;
    titleFa?: string;
    mistake: string;
    mistakeFa?: string;
    correction: string;
    correctionFa?: string;
    why: string;
    whyFa?: string;
  }[];
  questions: Question[];
}

export interface Unit {
  id: string;
  number: number;
  title: string;
  titleFa?: string;
  description: string;
  descriptionFa?: string;
  lessons: Lesson[];
}

export interface GeneratedQuestion {
  originalId: string;
  prompt: string;
  contextData?: {
    tableTitle?: string;
    headers?: string[];
    rows?: Array<Array<string | number>>;
  };
  visualModel?: VisualModelConfig;
  correctAnswer: string | number;
  options?: string[];
  explanation: string;
  solutionSteps: string[];
  difficulty: Difficulty;
}

export type PaperLayout = 'standard_test' | 'playful_adventure' | 'comic_strip' | 'practice_sheet' | 'homework' | 'speed_drill';
export type PaperGrid = 'grid' | 'lined' | 'dots' | 'blank';
export type PaperFont = 'sans' | 'serif' | 'mono';
export type PaperCrest = 'crest' | 'star' | 'math' | 'none';
export type PaperMascot = 'fox' | 'owl' | 'rocket' | 'pencil' | 'none';

export interface WorksheetVisibility {
  showSchoolName: boolean;
  showTitle: boolean;
  showSubtitle: boolean;
  showStudentInfo?: boolean;
  showNameField: boolean;
  showDateField: boolean;
  showPeriodField: boolean;
  showScoreBox: boolean;
  showScoreRubric: boolean;
  showDirections: boolean;
  showMascot: boolean;
  showAnswerBoxes: boolean;
  showTeacherNote: boolean;
  showQuestionIcons: boolean;
  showSmileyRating: boolean;
  showDoodleBorder: boolean;
}

export interface WorksheetItem {
  id: string;
  sourceType: 'original' | 'generated' | 'custom' | 'section_heading';
  questionId?: string;
  prompt: string;
  sectionHeading?: string;
  contextData?: {
    tableTitle?: string;
    headers?: string[];
    rows?: Array<Array<string | number>>;
  };
  visualModel?: VisualModelConfig;
  answer: string | number;
  solutionSteps: string[];
  notes?: string;
  score: number;
  allocatedSpaceLines: number;
}

export interface Worksheet {
  id: string;
  title: string;
  subtitle?: string;
  schoolName: string;
  grade: string;
  subject: string;
  teacherName: string;
  studentNamePlaceholder: string;
  dateStr: string;
  dateLabel?: string;
  periodLabel?: string;
  periodValue?: string;
  durationMinutes: number;
  totalScore: number;
  scoreBoxLabel?: string;
  gradingRubricText?: string;
  instructions: string;
  teacherNote?: string;
  items: WorksheetItem[];
  layout: PaperLayout;
  paperGrid: PaperGrid;
  paperFont: PaperFont;
  paperSize: 'a4' | 'letter';
  crest: PaperCrest;
  mascot?: PaperMascot;
  gradingRubric: boolean;
  showAnswerKey: boolean;
  twoColumns: boolean;
  watermarkText?: string;
  visibility: WorksheetVisibility;
  createdDate: string;
}

export interface ErrorDetectiveCase {
  id: string;
  title: string;
  titleFa?: string;
  studentName: string;
  problemPrompt: string;
  problemPromptFa?: string;
  studentWork: string;
  studentAnswer: string;
  correctAnswer: string;
  diagnosisQuestion: string;
  diagnosisQuestionFa?: string;
  options: string[];
  optionsFa?: string[];
  correctOptionIndex: number;
  explanation: string;
  explanationFa?: string;
  lessonId: string;
}
