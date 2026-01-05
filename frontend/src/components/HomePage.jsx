import './HomePage.css';
export default function HomePage({userData}){
    return(
        <>
        <div className="homepage-container">
        <h1>Welcome to HomePage</h1>
        <p>{userData.name}</p>
        <p>{userData.gmail}</p>
        </div>
        </>
    );
}