export default function DataField(props: { name: string; xarrow_id?: string }) {
  return (
    <div className="text-sm" id={props.xarrow_id}>
      {props.name}
    </div>
  );
}
