import { getStyles } from "@/config/styles";
import { useSettingsStore } from "@/store/settingsStore";


interface ItemProps {
  label: string;
  checked: any;
  action: any;
}


export default function CheckBox({label, checked, action}: ItemProps)
{
  const styles = getStyles();
  const settings = useSettingsStore();

  return (
    <li>
      <label className={styles.label}>
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={checked}
          onChange={action} />
        <span className="label-text">{label}</span>
      </label>
    </li>
  );
};
