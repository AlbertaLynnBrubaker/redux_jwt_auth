import { useGetUsersQuery } from "./usersApiSlice";
import { Link } from "react-router-dom";

const UsersList = () => {
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery()

    let usersListContent
    if (isLoading) {
        usersListContent = <p>"Loading...</p>
    } else if (isSuccess) {
        usersListContent = (
            <section className="users">
                <h1>Users List</h1>
                <ul>
                    {users.map((user, i) => {
                        return <li key={i}>{user.username}</li>
                    })}
                </ul>
                <Link to='/welcome'>Back to Welcome</Link>
            </section>
        )
    } else if (isError) {
        usersListContent = <p>{JSON.stringify(error)}</p>
    }

    return usersListContent
}

export default UsersList