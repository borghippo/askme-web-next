import { useSettingsStore } from "@/store/settingsStore";
import { getStyles } from "@/config/styles";

export default function ErrorMessage({ status, message, stack, details }:
{
  status: string;
  message: string;
  stack: string[];
  details: any;
}) 
{
  const settings = useSettingsStore();
  const styles = getStyles();
  const stack_last = stack ? stack.slice(-1)[0] : '';

  return (
    <div>
    {settings.devMode ? (
      <div className="p-5">
        <p className="text-xl text-red-800 font-bold pb-5">An exception occurred</p>
        <table className="border-collapse mb-5">
          <tr>
            <td className="border border-slate-300 p-2">Status code</td>
            <td className="border border-slate-300 p-2">{status}</td>
          </tr>
          <tr>
            <td className="border border-slate-300 p-2">Message</td>
            <td className="border border-slate-300 p-2">{message}</td>
          </tr>
          <tr>
            <td className="border border-slate-300 p-2">Error</td>
            <td className="border border-slate-300 p-2">{stack_last}</td>
          </tr>
        </table>
        <p>Details</p>
        <pre className="p-5 text-xs">{JSON.stringify(details, null, 2)}</pre>
        <p>Python stack trace:</p>
        <pre className="p-5 text-xs">{stack}</pre>
      </div>
      ) : (
      <div className={styles.message}>
        <p className="text-3xl">
          <span className="text-red-800">{status}</span> | {message}
        </p>
      </div>
      )}
    </div>
  )
}
