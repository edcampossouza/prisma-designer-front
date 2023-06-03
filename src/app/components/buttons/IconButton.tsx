type Props = {
  children: React.ReactNode;
  [x: string]: any;
};
export default function IconButton(props: Props) {
  const { children, ...rest } = props;
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white w-10 h-10 rounded-lg flex items-center justify-center text-3xl"
      {...rest}
    >
      {children}
    </button>
  );
}
