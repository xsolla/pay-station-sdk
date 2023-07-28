export interface FormError {
  code: number;
  message: string;
  element_name?: string;
  alternative_instances?: Array<{
    id: number;
    rank: number;
    name: string;
    aliases: string;
    cat: number[];
    is_visible: boolean;
    recommended: 0 | 1;
    enabled_save_account: null | unknown[];
    switch_icon_name: string | null;
  }>;
}
