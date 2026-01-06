export default function StudentProfilePage({newUserData}){
    return(
        <>
        <h1>Welcome to your profile </h1>
        <p>{newUserData?.rollNo}</p>
        <p>{newUserData?.section}</p>
        <p>{newUserData?.semester}</p>
        <p>{newUserData?.branch}</p>
        </>
    );
}