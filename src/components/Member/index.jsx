import {PlacematContainer} from "../PlacematContainer";

const Member = ({ member, onClick }) => {

    return(
        <PlacematContainer label={member.name}>
            <div className="flex align-top border h-3/4 w-3/4" onClick={onClick}>
                <img
                    src={`${process.env.PUBLIC_URL}/${member.image}`}
                    alt={`${member.name}`}
                    className="object-center h-full w-full"
                />
            </div>
        </PlacematContainer>
    )
}

export default Member
