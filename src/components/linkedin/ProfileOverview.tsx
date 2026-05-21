import { LinkedinResult } from '../../types/linkedin'
import {CircleUser, ExternalLink} from 'lucide-react'


interface Props {
    data: LinkedinResult
}


export default function ProfileOverview({ data }: Props) {
    
    const name = data.name
    const headline = data.headline
    const location = data.location
    const profileURL = data.link
    let profilePic 



    return (
        <div className="flex flex-row items-center gap-6 rounded-2xl bg-white p-6">

            {/* Profile Picture (to be added later) */}
            <div className="w-20 h-20 rounded-full overflow-hidden bg-slate-200 flex-shrink-0">
                {profilePic ? (
                    <img
                        src={profilePic}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <CircleUser className="w-full h-full object-cover"/>
                )}
            </div>

            {/* Info */}
            <div className="flex flex-col gap-1">
                <h2 className="text-xl font-bold text-slate-900">{name}</h2>
                <p className="text-sm text-slate-600">{headline}</p>
                <p className="text-sm text-slate-400">{location}</p>
                
                    

                <a  href={`https://${profileURL}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-blue-500 hover:underline mt-1">
                    
                    <div className="flex flex-row items-center gap-2">
                        linkedin.com/in/{data.name.toLowerCase().replace(/\s+/g, '-')}
                        <ExternalLink className="w-5 h-5"/>
                    </div>
                    
                    </a>
                    
            </div>

        </div>
    )
}