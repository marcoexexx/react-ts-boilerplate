import { SuspenseLoader } from "@/components/core";
import { ComponentType, LazyExoticComponent, Suspense } from "react";

export default function PageLoader<P extends {}>(
  Component: LazyExoticComponent<ComponentType<P>>,
) {
  return (props: any) => (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );
}
