/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

// API Types and Interfaces
export interface User {
  id: string;
  username: string;
  displayName?: string;
  avatar?: string;
  karma: number;
  badges: string[];
  joinDate: string;
  isVerified: boolean;
}

export interface Subreddit {
  id: string;
  name: string;
  displayName: string;
  description: string;
  members: number;
  online: number;
  createdAt: string;
  isJoined: boolean;
  isModerator: boolean;
  rules: string[];
  topics: string[];
  growth: string;
}

export interface Post {
  id: string;
  subreddit: string;
  author: User;
  title: string;
  content: string;
  type: 'text' | 'link' | 'image' | 'video';
  mediaUrl?: string;
  upvotes: number;
  downvotes: number;
  score: number;
  comments: number;
  createdAt: string;
  isSaved: boolean;
  isUpvoted: boolean;
  isDownvoted: boolean;
  awards: string[];
  aiInsights?: {
    confidence: number;
    keyTopics: string[];
    sentiment: 'positive' | 'negative' | 'neutral' | 'informative' | 'hopeful';
    readTime: string;
    summary: string;
  };
  tags: string[];
  nsfw: boolean;
  spoiler: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  author: User;
  content: string;
  upvotes: number;
  downvotes: number;
  score: number;
  createdAt: string;
  isEdited: boolean;
  editedAt?: string;
  isOp: boolean;
  isModerator: boolean;
  isUpvoted: boolean;
  isDownvoted: boolean;
  awards: string[];
  replies: Comment[];
  depth: number;
  isCollapsed: boolean;
  parentId?: string;
}

export interface SearchResult {
  posts: Post[];
  subreddits: Subreddit[];
  users: User[];
  totalResults: number;
  searchTime: number;
  suggestions: string[];
  relatedQueries: string[];
}

export interface FeedFilters {
  sort: 'hot' | 'new' | 'top' | 'rising' | 'controversial';
  time: 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';
  type: 'all' | 'text' | 'link' | 'image' | 'video';
  engagement: 'all' | 'high' | 'medium' | 'low';
  topics: string[];
  subreddits: string[];
  nsfw: boolean;
  spoiler: boolean;
}

// Mock Data
const mockUsers: User[] = [
  {
    id: '1',
    username: 'techuser123',
    displayName: 'Tech Enthusiast',
    karma: 125000,
    badges: ['Expert Contributor', 'Gold'],
    joinDate: '2020-03-15',
    isVerified: true,
  },
  {
    id: '2',
    username: 'developer_jane',
    displayName: 'Jane Developer',
    karma: 89000,
    badges: ['Senior Dev', 'Platinum'],
    joinDate: '2019-08-22',
    isVerified: true,
  },
  {
    id: '3',
    username: 'researcher_mike',
    displayName: 'Mike Researcher',
    karma: 67000,
    badges: ['Verified Researcher', 'Diamond'],
    joinDate: '2021-01-10',
    isVerified: true,
  },
];

const mockSubreddits: Subreddit[] = [
  {
    id: '1',
    name: 'technology',
    displayName: 'r/technology',
    description: 'The latest technology news and discussions.',
    members: 2100000,
    online: 15420,
    createdAt: '2008-01-25',
    isJoined: true,
    isModerator: false,
    rules: ['No spam', 'Be respectful', 'Stay on topic'],
    topics: ['Technology', 'Innovation', 'Gadgets'],
    growth: '+12%',
  },
  {
    id: '2',
    name: 'programming',
    displayName: 'r/programming',
    description: 'Computer Programming',
    members: 3800000,
    online: 23450,
    createdAt: '2008-01-25',
    isJoined: true,
    isModerator: false,
    rules: ['No blogspam', 'No surveys', 'No job postings'],
    topics: ['Programming', 'Software Development', 'Coding'],
    growth: '+8%',
  },
  {
    id: '3',
    name: 'science',
    displayName: 'r/science',
    description: 'This community is a place to share and discuss new scientific research.',
    members: 28900000,
    online: 45670,
    createdAt: '2008-01-25',
    isJoined: false,
    isModerator: false,
    rules: ['No pseudoscience', 'Cite sources', 'Be respectful'],
    topics: ['Science', 'Research', 'Discovery'],
    growth: '+15%',
  },
];

const mockPosts: Post[] = [
  {
    id: '1',
    subreddit: 'technology',
    author: mockUsers[0],
    title: 'New AI breakthrough shows promise for medical diagnosis',
    content: 'Researchers have developed a new machine learning model that can diagnose rare diseases with 95% accuracy, potentially revolutionizing medical care in underserved areas.',
    type: 'text',
    upvotes: 2847,
    downvotes: 45,
    score: 2802,
    comments: 234,
    createdAt: '2024-01-15T10:30:00Z',
    isSaved: false,
    isUpvoted: false,
    isDownvoted: false,
    awards: ['Gold', 'Silver', 'Helpful'],
    aiInsights: {
      confidence: 92,
      keyTopics: ['Machine Learning', 'Healthcare', 'Medical Diagnosis'],
      sentiment: 'positive',
      readTime: '3 min read',
      summary: 'AI model achieves 95% accuracy in rare disease diagnosis, showing potential for healthcare revolution.',
    },
    tags: ['AI', 'Healthcare', 'Machine Learning'],
    nsfw: false,
    spoiler: false,
  },
  {
    id: '2',
    subreddit: 'programming',
    author: mockUsers[1],
    title: 'Why TypeScript is becoming essential for large-scale applications',
    content: 'This post discusses the benefits of TypeScript in enterprise environments, including better code maintainability, fewer runtime errors, and improved developer experience.',
    type: 'text',
    upvotes: 1523,
    downvotes: 23,
    score: 1500,
    comments: 189,
    createdAt: '2024-01-15T08:15:00Z',
    isSaved: false,
    isUpvoted: false,
    isDownvoted: false,
    awards: ['Platinum'],
    aiInsights: {
      confidence: 88,
      keyTopics: ['TypeScript', 'Enterprise Development', 'Code Quality'],
      sentiment: 'informative',
      readTime: '5 min read',
      summary: 'TypeScript provides significant benefits for large-scale applications through improved type safety and developer experience.',
    },
    tags: ['TypeScript', 'Programming', 'Enterprise'],
    nsfw: false,
    spoiler: false,
  },
  {
    id: '3',
    subreddit: 'science',
    author: mockUsers[2],
    title: 'Climate change study reveals unexpected ecosystem adaptations',
    content: 'New research shows that certain plant species are adapting to climate change faster than predicted, offering hope for ecosystem resilience.',
    type: 'text',
    upvotes: 4521,
    downvotes: 67,
    score: 4454,
    comments: 567,
    createdAt: '2024-01-15T06:45:00Z',
    isSaved: false,
    isUpvoted: false,
    isDownvoted: false,
    awards: ['Gold', 'Diamond'],
    aiInsights: {
      confidence: 94,
      keyTopics: ['Climate Change', 'Ecology', 'Environmental Science'],
      sentiment: 'hopeful',
      readTime: '4 min read',
      summary: 'Plant species show faster adaptation to climate change than expected, providing optimism for ecosystem resilience.',
    },
    tags: ['Climate Change', 'Ecology', 'Research'],
    nsfw: false,
    spoiler: false,
  },
];

// API Functions
export class RedditAPI {
  // Posts
  static async getPosts(filters?: Partial<FeedFilters>): Promise<Post[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let filteredPosts = [...mockPosts];
    
    if (filters?.sort) {
      switch (filters.sort) {
        case 'hot':
          filteredPosts.sort((a, b) => b.score - a.score);
          break;
        case 'new':
          filteredPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        case 'top':
          filteredPosts.sort((a, b) => b.upvotes - a.upvotes);
          break;
        case 'rising':
          filteredPosts.sort((a, b) => (b.upvotes / b.comments) - (a.upvotes / a.comments));
          break;
      }
    }
    
    if (filters?.subreddits?.length) {
      filteredPosts = filteredPosts.filter(post => 
        filters.subreddits!.includes(post.subreddit)
      );
    }
    
    if (filters?.topics?.length) {
      filteredPosts = filteredPosts.filter(post => 
        post.tags.some(tag => filters.topics!.includes(tag))
      );
    }
    
    return filteredPosts;
  }

  static async getPost(id: string): Promise<Post | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockPosts.find(post => post.id === id) || null;
  }

  static async votePost(postId: string, vote: 'up' | 'down' | 'remove'): Promise<Post> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const post = mockPosts.find(p => p.id === postId);
    if (!post) throw new Error('Post not found');
    
    // Update vote status
    if (vote === 'up') {
      if (post.isUpvoted) {
        post.isUpvoted = false;
        post.upvotes--;
      } else {
        if (post.isDownvoted) {
          post.downvotes--;
          post.isDownvoted = false;
        }
        post.isUpvoted = true;
        post.upvotes++;
      }
    } else if (vote === 'down') {
      if (post.isDownvoted) {
        post.isDownvoted = false;
        post.downvotes--;
      } else {
        if (post.isUpvoted) {
          post.upvotes--;
          post.isUpvoted = false;
        }
        post.isDownvoted = true;
        post.downvotes++;
      }
    }
    
    post.score = post.upvotes - post.downvotes;
    return { ...post };
  }

  static async savePost(postId: string): Promise<Post> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const post = mockPosts.find(p => p.id === postId);
    if (!post) throw new Error('Post not found');
    
    post.isSaved = !post.isSaved;
    return { ...post };
  }

  // Comments
  static async getComments(postId: string): Promise<Comment[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Generate mock comments
    const comments: Comment[] = [
      {
        id: '1',
        postId,
        author: mockUsers[0],
        content: 'This is incredibly promising! As a practicing physician, I can see immediate applications in rural healthcare.',
        upvotes: 156,
        downvotes: 3,
        score: 153,
        createdAt: '2024-01-15T11:30:00Z',
        isEdited: false,
        isOp: false,
        isModerator: false,
        isUpvoted: false,
        isDownvoted: false,
        awards: ['Gold'],
        replies: [],
        depth: 0,
        isCollapsed: false,
      },
      {
        id: '2',
        postId,
        author: mockUsers[1],
        content: 'The accuracy rate of 95% is quite impressive, though I\'d like to see more details about the false positive/negative rates.',
        upvotes: 89,
        downvotes: 1,
        score: 88,
        createdAt: '2024-01-15T12:15:00Z',
        isEdited: false,
        isOp: false,
        isModerator: false,
        isUpvoted: false,
        isDownvoted: false,
        awards: [],
        replies: [
          {
            id: '2-1',
            postId,
            author: mockUsers[2],
            content: 'The paper mentions a false positive rate of 2.1% and false negative rate of 3.4%. These are actually quite good for this type of diagnostic tool.',
            upvotes: 45,
            downvotes: 0,
            score: 45,
            createdAt: '2024-01-15T13:00:00Z',
            isEdited: false,
            isOp: false,
            isModerator: false,
            isUpvoted: false,
            isDownvoted: false,
            awards: [],
            replies: [],
            depth: 1,
            isCollapsed: false,
            parentId: '2',
          },
        ],
        depth: 0,
        isCollapsed: false,
      },
    ];
    
    return comments;
  }

  static async voteComment(commentId: string, vote: 'up' | 'down' | 'remove'): Promise<Comment> {
    await new Promise(resolve => setTimeout(resolve, 100));
    // Mock implementation - in real app, this would update the comment
    throw new Error('Not implemented');
  }

  // Subreddits
  static async getSubreddits(): Promise<Subreddit[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockSubreddits;
  }

  static async getSubreddit(name: string): Promise<Subreddit | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockSubreddits.find(sub => sub.name === name) || null;
  }

  static async joinSubreddit(subredditId: string): Promise<Subreddit> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const subreddit = mockSubreddits.find(s => s.id === subredditId);
    if (!subreddit) throw new Error('Subreddit not found');
    
    subreddit.isJoined = !subreddit.isJoined;
    if (subreddit.isJoined) {
      subreddit.members++;
    } else {
      subreddit.members--;
    }
    
    return { ...subreddit };
  }

  // Search
  static async search(query: string, filters?: Partial<FeedFilters>): Promise<SearchResult> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const searchTerm = query.toLowerCase();
    
    const posts = mockPosts.filter(post => 
      post.title.toLowerCase().includes(searchTerm) ||
      post.content.toLowerCase().includes(searchTerm) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
    
    const subreddits = mockSubreddits.filter(sub => 
      sub.displayName.toLowerCase().includes(searchTerm) ||
      sub.description.toLowerCase().includes(searchTerm) ||
      sub.topics.some(topic => topic.toLowerCase().includes(searchTerm))
    );
    
    const users = mockUsers.filter(user => 
      user.username.toLowerCase().includes(searchTerm) ||
      user.displayName?.toLowerCase().includes(searchTerm)
    );
    
    return {
      posts,
      subreddits,
      users,
      totalResults: posts.length + subreddits.length + users.length,
      searchTime: 0.12,
      suggestions: [
        'machine learning applications',
        'deep learning tutorials',
        'neural networks explained',
        'AI in healthcare',
      ],
      relatedQueries: [
        'artificial intelligence',
        'machine learning',
        'deep learning',
        'neural networks',
      ],
    };
  }

  // User
  static async getCurrentUser(): Promise<User | null> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockUsers[0]; // Return first user as current user
  }

  static async getUser(username: string): Promise<User | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockUsers.find(user => user.username === username) || null;
  }

  // Favorites
  static async getSavedPosts(): Promise<Post[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockPosts.filter(post => post.isSaved);
  }

  static async getUpvotedPosts(): Promise<Post[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockPosts.filter(post => post.isUpvoted);
  }
}

// Export default instance
export default RedditAPI;
