import { domains } from "@/config/domains";
import { getStyles } from "@/config/styles";
import { useSettingsStore } from "@/store/settingsStore";
import CheckBox from "@/components/CheckBox";
import TextInput from "@/components/TextInput";


export default function Settings()
{
  const styles = getStyles();
  const settings = useSettingsStore();

  return (
    <div className="drawer-side">
      <label
        htmlFor="settings-drawer"
        aria-label="close sidebar"
        className="drawer-overlay" />
      <ul className={styles.settings}>
        <li>
          <h2 className="menu-title">Domain Filters</h2>
          <ul>
            {domains.map((domain, i) => {
              return (
                <CheckBox
                  key={i}
                  label={domain}
                  checked={!!settings.domains[i].enabled}
                  action={() => settings.toggleDomain(i)} />
              );
            })}
          </ul>
        </li>
        <li>
          <h2 className="menu-title">Display Settings</h2>
          <ul>
            <TextInput
              label="terms per document"
              value={settings.termsPerDocument}
              action={(e: any) => settings.setTermsPerDocument(Number(e.target.value))}/>
            <TextInput
              label="terms per document set"
              value={settings.termsPerDocumentSet}
              action={(e: any) => settings.setTermsPerDocumentSet(Number(e.target.value))}/>
          </ul>
        </li>
        <li>
          <h2 className="menu-title">Debugging</h2>
          <ul>
            <CheckBox
              label="developer mode"
              checked={!!settings.devMode}
              action={() => settings.toggleDevMode()}/>
          </ul>
        </li>
      </ul>
    </div>
  );
}
