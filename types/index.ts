//TODO: Import types for chatting screen
export type SingleChatType = {};

export enum FriendRequestEnum {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

export enum RespondFriendRequestEnum {
  ACCEPT = "ACCEPT",
  REJECT = "REJECT",
}

export type RespondFriendRequest = {
  action: RespondFriendRequestEnum;
};

export type User = {
  id: string;
  email: string;
  name: string;
  profileImage: string;
  aboutMe: string;
  sentFriendRequests?: {
    createdAt: Date;
    id: string;
    receiverId: string;
    senderId: string;
    status: FriendRequestEnum;
  }[];
  receivedFriendRequests?: {
    id: string;
    senderId: string;
    receiverId: string;
    status: FriendRequestEnum;
    createdAt: Date;
  }[];
};

export type FriendRequest = {
  id: string;
  senderId: string;
  receiverId: string;
  status: FriendRequestEnum;
  createdAt: Date;
  sender: User;
};

export type Chat = {
  id: string;
  createdAt: Date;
  lastMessage: string;
  lastMessageAt: Date;
  userA: {
    id: string;
    name: string;
    email: string;
    profileImage: string;
  };
  userAId: string;
  userB: {
    id: string;
    name: string;
    email: string;
    profileImage: string;
    aboutMe: string;
  };
  userBId: string;
};
