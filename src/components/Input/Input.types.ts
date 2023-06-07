export interface InputProps {
  value: string;
  onTextChange: (text: string) => void;
  placeholder: string;
  validCheck: (text: string) => boolean;
  errorMessage: string;
}
