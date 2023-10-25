import React, { Suspense, ComponentType } from "react";
import { Loader } from "../../components/shared/Loader/Loader";

type InjectedProps = {};

export function withSuspense<PropsType extends JSX.IntrinsicAttributes>(Component: ComponentType<PropsType>) {
    function SuspenseComponent(props: InjectedProps) {
        return (
            <Suspense fallback={<Loader/>}>
                <Component {...props as PropsType} />
            </Suspense>
        )
    }
    return <SuspenseComponent />
}