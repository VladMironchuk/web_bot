export interface ButtonProps {
  type: 'add' | 'remove' | 'checkout';
  title: string;
  disabled?: boolean;
  onClick?: () => void;
}
