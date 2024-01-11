import { getStyles } from "@/config/styles";
import { useSettingsStore } from "@/store/settingsStore";


interface ItemProps {
  label: string;
  value: any;
  action: any;
}


export default function TextInput({label, value, action}: ItemProps)
{
  const styles = getStyles();
  const settings = useSettingsStore();

  return (
    <li>
      <label className={styles.label}>
        <input
          className={styles.textInput}
          type="text"
          value={value}
          onChange={action} />
        <span className="label-text">{label}</span>
      </label>
    </li>
  );
};
