export default function Loader() {
  return (
    <div className="flex min-h-[calc(100vh-100px)] w-full items-center justify-center py-10">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary" />
      <span className="ml-4 text-lg text-muted-foreground">Loading...</span>
    </div>
  );
}
