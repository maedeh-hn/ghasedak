import UserLinksTable from "../components/table/UserLinksTable";
import {useQuery} from "@tanstack/react-query";
import {getAllLinks} from "src/services/users/link";

const AccountLinks = () => {

  const { isLoading, data, refetch } = useQuery(['UserLinkList'], getAllLinks);

  return(
      <UserLinksTable data={data ? data.data : []} isLoading={isLoading} refetch={refetch} />
  )
}
export default AccountLinks;