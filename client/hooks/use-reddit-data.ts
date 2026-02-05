import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import RedditAPI, { 
  Post, 
  Comment, 
  Subreddit, 
  User, 
  SearchResult, 
  FeedFilters 
} from '@shared/api';

// Query Keys
export const queryKeys = {
  posts: ['posts'] as const,
  post: (id: string) => ['post', id] as const,
  comments: (postId: string) => ['comments', postId] as const,
  subreddits: ['subreddits'] as const,
  subreddit: (name: string) => ['subreddit', name] as const,
  search: (query: string, filters?: Partial<FeedFilters>) => ['search', query, filters] as const,
  user: (username: string) => ['user', username] as const,
  currentUser: ['currentUser'] as const,
  savedPosts: ['savedPosts'] as const,
  upvotedPosts: ['upvotedPosts'] as const,
};

// Posts
export const usePosts = (filters?: Partial<FeedFilters>) => {
  return useQuery({
    queryKey: queryKeys.posts,
    queryFn: () => RedditAPI.getPosts(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const usePost = (id: string) => {
  return useQuery({
    queryKey: queryKeys.post(id),
    queryFn: () => RedditAPI.getPost(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useComments = (postId: string) => {
  return useQuery({
    queryKey: queryKeys.comments(postId),
    queryFn: () => RedditAPI.getComments(postId),
    enabled: !!postId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Subreddits
export const useSubreddits = () => {
  return useQuery({
    queryKey: queryKeys.subreddits,
    queryFn: () => RedditAPI.getSubreddits(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useSubreddit = (name: string) => {
  return useQuery({
    queryKey: queryKeys.subreddit(name),
    queryFn: () => RedditAPI.getSubreddit(name),
    enabled: !!name,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Search
export const useSearch = (query: string, filters?: Partial<FeedFilters>) => {
  return useQuery({
    queryKey: queryKeys.search(query, filters),
    queryFn: () => RedditAPI.search(query, filters),
    enabled: !!query && query.length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// User
export const useCurrentUser = () => {
  return useQuery({
    queryKey: queryKeys.currentUser,
    queryFn: () => RedditAPI.getCurrentUser(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUser = (username: string) => {
  return useQuery({
    queryKey: queryKeys.user(username),
    queryFn: () => RedditAPI.getUser(username),
    enabled: !!username,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Favorites
export const useSavedPosts = () => {
  return useQuery({
    queryKey: queryKeys.savedPosts,
    queryFn: () => RedditAPI.getSavedPosts(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useUpvotedPosts = () => {
  return useQuery({
    queryKey: queryKeys.upvotedPosts,
    queryFn: () => RedditAPI.getUpvotedPosts(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Mutations
export const useVotePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ postId, vote }: { postId: string; vote: 'up' | 'down' | 'remove' }) =>
      RedditAPI.votePost(postId, vote),
    onSuccess: (updatedPost) => {
      // Update the specific post
      queryClient.setQueryData(queryKeys.post(updatedPost.id), updatedPost);
      
      // Update posts list
      queryClient.setQueryData(queryKeys.posts, (oldData: Post[] | undefined) => {
        if (!oldData) return [updatedPost];
        return oldData.map(post => 
          post.id === updatedPost.id ? updatedPost : post
        );
      });
      
      // Update saved/upvoted posts if needed
      if (updatedPost.isSaved) {
        queryClient.setQueryData(queryKeys.savedPosts, (oldData: Post[] | undefined) => {
          if (!oldData) return [updatedPost];
          return oldData.some(post => post.id === updatedPost.id) 
            ? oldData 
            : [...oldData, updatedPost];
        });
      } else {
        queryClient.setQueryData(queryKeys.savedPosts, (oldData: Post[] | undefined) => {
          if (!oldData) return [];
          return oldData.filter(post => post.id !== updatedPost.id);
        });
      }
      
      if (updatedPost.isUpvoted) {
        queryClient.setQueryData(queryKeys.upvotedPosts, (oldData: Post[] | undefined) => {
          if (!oldData) return [updatedPost];
          return oldData.some(post => post.id === updatedPost.id) 
            ? oldData 
            : [...oldData, updatedPost];
        });
      } else {
        queryClient.setQueryData(queryKeys.upvotedPosts, (oldData: Post[] | undefined) => {
          if (!oldData) return [];
          return oldData.filter(post => post.id !== updatedPost.id);
        });
      }
    },
  });
};

export const useSavePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ postId }: { postId: string }) => RedditAPI.savePost(postId),
    onSuccess: (updatedPost) => {
      // Update the specific post
      queryClient.setQueryData(queryKeys.post(updatedPost.id), updatedPost);
      
      // Update posts list
      queryClient.setQueryData(queryKeys.posts, (oldData: Post[] | undefined) => {
        if (!oldData) return [updatedPost];
        return oldData.map(post => 
          post.id === updatedPost.id ? updatedPost : post
        );
      });
      
      // Update saved posts
      if (updatedPost.isSaved) {
        queryClient.setQueryData(queryKeys.savedPosts, (oldData: Post[] | undefined) => {
          if (!oldData) return [updatedPost];
          return oldData.some(post => post.id === updatedPost.id) 
            ? oldData 
            : [...oldData, updatedPost];
        });
      } else {
        queryClient.setQueryData(queryKeys.savedPosts, (oldData: Post[] | undefined) => {
          if (!oldData) return [];
          return oldData.filter(post => post.id !== updatedPost.id);
        });
      }
    },
  });
};

export const useJoinSubreddit = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ subredditId }: { subredditId: string }) => 
      RedditAPI.joinSubreddit(subredditId),
    onSuccess: (updatedSubreddit) => {
      // Update subreddits list
      queryClient.setQueryData(queryKeys.subreddits, (oldData: Subreddit[] | undefined) => {
        if (!oldData) return [updatedSubreddit];
        return oldData.map(sub => 
          sub.id === updatedSubreddit.id ? updatedSubreddit : sub
        );
      });
      
      // Update specific subreddit
      queryClient.setQueryData(queryKeys.subreddit(updatedSubreddit.name), updatedSubreddit);
    },
  });
};

export const useVoteComment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ commentId, vote }: { commentId: string; vote: 'up' | 'down' | 'remove' }) =>
      RedditAPI.voteComment(commentId, vote),
    onSuccess: (updatedComment, variables) => {
      // Update comments for the post
      queryClient.setQueryData(
        queryKeys.comments(updatedComment.postId), 
        (oldData: Comment[] | undefined) => {
          if (!oldData) return [updatedComment];
          
          const updateCommentInTree = (comments: Comment[]): Comment[] => {
            return comments.map(comment => {
              if (comment.id === updatedComment.id) {
                return updatedComment;
              }
              if (comment.replies.length > 0) {
                return {
                  ...comment,
                  replies: updateCommentInTree(comment.replies),
                };
              }
              return comment;
            });
          };
          
          return updateCommentInTree(oldData);
        }
      );
    },
  });
};

// Utility hooks
export const usePostActions = (postId: string) => {
  const voteMutation = useVotePost();
  const saveMutation = useSavePost();
  
  const handleVote = (vote: 'up' | 'down' | 'remove') => {
    voteMutation.mutate({ postId, vote });
  };
  
  const handleSave = () => {
    saveMutation.mutate({ postId });
  };
  
  return {
    handleVote,
    handleSave,
    isVoting: voteMutation.isPending,
    isSaving: saveMutation.isPending,
  };
};

export const useSubredditActions = (subredditId: string) => {
  const joinMutation = useJoinSubreddit();
  
  const handleJoin = () => {
    joinMutation.mutate({ subredditId });
  };
  
  return {
    handleJoin,
    isJoining: joinMutation.isPending,
  };
};

export const useCommentActions = (commentId: string) => {
  const voteMutation = useVoteComment();
  
  const handleVote = (vote: 'up' | 'down' | 'remove') => {
    voteMutation.mutate({ commentId, vote });
  };
  
  return {
    handleVote,
    isVoting: voteMutation.isPending,
  };
};

// Optimistic updates
export const useOptimisticVote = () => {
  const queryClient = useQueryClient();
  
  return (postId: string, vote: 'up' | 'down' | 'remove') => {
    queryClient.setQueryData(queryKeys.post(postId), (oldData: Post | undefined) => {
      if (!oldData) return oldData;
      
      const updatedPost = { ...oldData };
      
      if (vote === 'up') {
        if (updatedPost.isUpvoted) {
          updatedPost.isUpvoted = false;
          updatedPost.upvotes--;
        } else {
          if (updatedPost.isDownvoted) {
            updatedPost.downvotes--;
            updatedPost.isDownvoted = false;
          }
          updatedPost.isUpvoted = true;
          updatedPost.upvotes++;
        }
      } else if (vote === 'down') {
        if (updatedPost.isDownvoted) {
          updatedPost.isDownvoted = false;
          updatedPost.downvotes--;
        } else {
          if (updatedPost.isUpvoted) {
            updatedPost.upvotes--;
            updatedPost.isUpvoted = false;
          }
          updatedPost.isDownvoted = true;
          updatedPost.downvotes++;
        }
      }
      
      updatedPost.score = updatedPost.upvotes - updatedPost.downvotes;
      return updatedPost;
    });
  };
};

export const useOptimisticSave = () => {
  const queryClient = useQueryClient();
  
  return (postId: string) => {
    queryClient.setQueryData(queryKeys.post(postId), (oldData: Post | undefined) => {
      if (!oldData) return oldData;
      return { ...oldData, isSaved: !oldData.isSaved };
    });
  };
};
