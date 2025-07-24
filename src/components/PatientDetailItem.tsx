type PatientDetailItemProps = {
    label: string
    detail: string
}

export default function PatientDetailItem({ label, detail }: PatientDetailItemProps) {
    return (
        <>
            <p className="font-bold mb-3 text-gray-700 uppercase">{`${label}: `}
                <span className="font-normal normal-case">{detail}</span>
            </p>
        </>
    )
}