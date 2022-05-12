import { transportVoteCode } from "./vote"

export const sendVoteCode = async (name: string, voteCode: string, email: string, votePortal: string) => {
  await transportVoteCode(name, voteCode, email, votePortal);
}