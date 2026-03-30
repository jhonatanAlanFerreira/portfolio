import PageLoadingProps from "./PageLoadingProps";

export default function PageLoading({ loading }: PageLoadingProps) {
  {
    return (
      loading && (
        <div className="flex space-x-2">
          <div className="h-4 w-4 animate-bounce rounded-full bg-slate-900"></div>
          <div className="h-4 w-4 animate-bounce rounded-full bg-slate-900 delay-150"></div>
          <div className="h-4 w-4 animate-bounce rounded-full bg-slate-900 delay-300"></div>
        </div>
      )
    );
  }
}
