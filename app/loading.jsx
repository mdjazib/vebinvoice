import { Loader2 } from 'lucide-react'
import React from 'react'

const loading = () => {
    return (
        <div className="suspense-loading">
            <Loader2 />
            <p>Loading...</p>
        </div>
    )
}

export default loading