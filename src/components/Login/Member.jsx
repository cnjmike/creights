import {PlacematContainer} from "../PlacematContainer";

const Member = ({ member, onClick }) => {

    return(
        <PlacematContainer label={member.name}>
            <div className="flex relative border h-3/4 w-3/4 items-center justify-center" onClick={onClick}>
                <img
                    src={`${process.env.PUBLIC_URL}/${member.image}`}
                    alt={`${member.name}`}
                    className="object-contain h-full w-full"
                />
            </div>
        </PlacematContainer>
    )
}

export default Member
