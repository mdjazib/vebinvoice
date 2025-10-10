import React, { Suspense } from "react";
import Content from './Content'

const page = () => {
    return (
        <Suspense fallback={null}>
            <Content />
        </Suspense>
    )
}

export default page