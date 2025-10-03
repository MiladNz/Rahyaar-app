import { getCurrentUserAction } from "@/app/actions/getCurrentUser";
import Header from "./Header";

export default async function HeaderWrapper() {
  const user = await getCurrentUserAction();
  return <Header user={user} />;
}
