import { getStyles } from "@/config/styles";
import Link from "next/link";


interface TermProps {
  index: number;
  term: any[];
  asRow: boolean;
}


export default function Term({index, term, asRow}: TermProps)
{
  const styles = getStyles();

  return (
    <>
    { asRow ? (
      <tr key={index}>
        <td className="w-10" align="right">{index + 1}</td>
        <td className="w-20" >{term[2].toFixed(4)}</td>
        <td className="w-20">{term[1]}</td>
        <td>
          <Link
            className="link link-primary"
            href={`/search?q=${term[0]}&type=exact`}>
            {term[0]}
          </Link>
        </td>
      </tr>
    ) : (
      <div key={index}>
        <Link
          className="link link-primary"
          href={`/search?q=${term[0]}&type=exact`}>
        {term[0]}
        </Link>
      </div>
    ) }
    </>
  );
};
