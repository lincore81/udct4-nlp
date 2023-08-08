export type Polarity = "P+" | "P" | "NEU" | "N" | "N+" | "NONE"
export type Agreement = "AGREEMENT" | "DISAGREEMENT"
export type Subjectivity = "OBJECTIVE" | "SUBJECTIVE"
export type Irony = "NONIRONIC" | "IRONIC"

export type Sentence = {
  text: string,
  confidence: number,
  score_tag: Polarity,
  agreement: Agreement,
}

export type Sentiment = {
  score_tag: Polarity,
  agreement: Agreement,
  subjectivity: Subjectivity,
  confidence: number,
  irony: Irony,
  sentence_list: Sentence[]
}

export type InterpretedSentiment = Sentiment & {
  highlights: Sentence[]
}

