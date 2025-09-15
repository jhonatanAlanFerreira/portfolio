import PageLoadingProps from "./PageLoadingProps";

export default function PageLoading({ loading }: PageLoadingProps) {
  {
    return (
      loading && (
        <div className="flex space-x-2">
          <div className="w-4 h-4 bg-slate-900 rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-slate-900 rounded-full animate-bounce delay-150"></div>
          <div className="w-4 h-4 bg-slate-900 rounded-full animate-bounce delay-300"></div>
        </div>
      )
    );
  }
}
