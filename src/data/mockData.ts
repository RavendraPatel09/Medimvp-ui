export interface Medicine {
  id: string
  name: string
  manufacturer: string
  category: string
  quantity: number
  unit: string
  manufacturingDate: string
  expiryDate: string
  originalPrice: number
  sellingPrice: number
  description: string
  images: string[]
  sellerId: string
  sellerName: string
  sellerRating: number
  sellerAvatar: string
  availability: 'available' | 'limited' | 'sold'
  tags: string[]
  rating: number
  reviews: number
  isWishlisted?: boolean
  uploadedAt: string
}

export interface ChatMessage {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: string
  seen: boolean
  type: 'text' | 'image'
  imageUrl?: string
}

export interface Conversation {
  id: string
  participantId: string
  participantName: string
  participantAvatar: string
  isOnline: boolean
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  medicineId?: string
  medicineName?: string
  messages: ChatMessage[]
}

export interface Notification {
  id: string
  type: 'order' | 'message' | 'system' | 'promo'
  title: string
  message: string
  timestamp: string
  isRead: boolean
  avatar?: string
  actionUrl?: string
}

// ─── Medicine Images (Unsplash placeholder pattern) ─────────────────────────

export const MEDICINES: Medicine[] = [
  {
    id: 'm1',
    name: 'Paracetamol 500mg',
    manufacturer: 'Cipla Ltd.',
    category: 'Pain Relief',
    quantity: 30,
    unit: 'tablets',
    manufacturingDate: '2024-01-10',
    expiryDate: '2026-01-10',
    originalPrice: 25,
    sellingPrice: 18,
    description: 'Effective pain reliever and fever reducer. Sealed original pack. Stored in cool dry conditions.',
    images: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=300&fit=crop',
    ],
    sellerId: 'u2',
    sellerName: 'MedStore Mumbai',
    sellerRating: 4.8,
    sellerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=medstore',
    availability: 'available',
    tags: ['pain relief', 'fever', 'generic'],
    rating: 4.7,
    reviews: 234,
    uploadedAt: '2025-06-28',
  },
  {
    id: 'm2',
    name: 'Metformin 500mg',
    manufacturer: 'Sun Pharma',
    category: 'Diabetes',
    quantity: 60,
    unit: 'tablets',
    manufacturingDate: '2024-03-15',
    expiryDate: '2026-03-15',
    originalPrice: 85,
    sellingPrice: 60,
    description: 'Metformin hydrochloride 500mg. Brand new sealed strip. Ideal for Type 2 diabetes management.',
    images: [
      'https://images.unsplash.com/photo-1626285861696-9f0bf5a49c6d?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
    ],
    sellerId: 'u3',
    sellerName: 'Wellness Hub',
    sellerRating: 4.5,
    sellerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wellness',
    availability: 'available',
    tags: ['diabetes', 'metformin'],
    rating: 4.6,
    reviews: 189,
    uploadedAt: '2025-06-27',
  },
  {
    id: 'm3',
    name: 'Amoxicillin 250mg',
    manufacturer: 'Dr. Reddy\'s',
    category: 'Antibiotics',
    quantity: 21,
    unit: 'capsules',
    manufacturingDate: '2024-06-01',
    expiryDate: '2026-06-01',
    originalPrice: 120,
    sellingPrice: 85,
    description: 'Broad-spectrum antibiotic. Original manufacturer packaging. 21 capsule blister pack.',
    images: [
      'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&h=300&fit=crop',
    ],
    sellerId: 'u4',
    sellerName: 'PharmaCare',
    sellerRating: 4.9,
    sellerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=pharmacare',
    availability: 'limited',
    tags: ['antibiotic', 'amoxicillin', 'infection'],
    rating: 4.8,
    reviews: 312,
    uploadedAt: '2025-06-25',
  },
  {
    id: 'm4',
    name: 'Atorvastatin 10mg',
    manufacturer: 'Zydus Cadila',
    category: 'Cholesterol',
    quantity: 45,
    unit: 'tablets',
    manufacturingDate: '2024-02-20',
    expiryDate: '2026-02-20',
    originalPrice: 95,
    sellingPrice: 65,
    description: 'Statin medication for cholesterol management. Well stored, full packaging intact.',
    images: [
      'https://images.unsplash.com/photo-1576671081837-49000212a370?w=400&h=300&fit=crop',
    ],
    sellerId: 'u5',
    sellerName: 'Health First',
    sellerRating: 4.3,
    sellerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=healthfirst',
    availability: 'available',
    tags: ['cholesterol', 'statin', 'heart'],
    rating: 4.4,
    reviews: 156,
    uploadedAt: '2025-06-22',
  },
  {
    id: 'm5',
    name: 'Omeprazole 20mg',
    manufacturer: 'Abbott India',
    category: 'Gastric',
    quantity: 14,
    unit: 'capsules',
    manufacturingDate: '2024-04-10',
    expiryDate: '2026-04-10',
    originalPrice: 75,
    sellingPrice: 52,
    description: 'Proton pump inhibitor for acid reflux. Original sealed pack. Excellent condition.',
    images: [
      'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=300&fit=crop',
    ],
    sellerId: 'u2',
    sellerName: 'MedStore Mumbai',
    sellerRating: 4.8,
    sellerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=medstore',
    availability: 'available',
    tags: ['gastric', 'acid', 'reflux'],
    rating: 4.5,
    reviews: 98,
    uploadedAt: '2025-06-20',
  },
  {
    id: 'm6',
    name: 'Vitamin D3 1000IU',
    manufacturer: 'Himalaya',
    category: 'Vitamins',
    quantity: 90,
    unit: 'softgels',
    manufacturingDate: '2024-05-01',
    expiryDate: '2026-05-01',
    originalPrice: 320,
    sellingPrice: 220,
    description: 'High-quality Vitamin D3 supplement. Sealed bottle. Perfect for bone and immune health.',
    images: [
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=300&fit=crop',
    ],
    sellerId: 'u3',
    sellerName: 'Wellness Hub',
    sellerRating: 4.5,
    sellerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wellness',
    availability: 'available',
    tags: ['vitamin', 'supplement', 'bone'],
    rating: 4.9,
    reviews: 421,
    uploadedAt: '2025-06-18',
  },
  {
    id: 'm7',
    name: 'Azithromycin 500mg',
    manufacturer: 'Pfizer',
    category: 'Antibiotics',
    quantity: 6,
    unit: 'tablets',
    manufacturingDate: '2024-07-01',
    expiryDate: '2026-07-01',
    originalPrice: 145,
    sellingPrice: 98,
    description: 'Z-pack antibiotic. 6-tablet complete course. Unused and sealed.',
    images: [
      'https://images.unsplash.com/photo-1576671081837-49000212a370?w=400&h=300&fit=crop',
    ],
    sellerId: 'u4',
    sellerName: 'PharmaCare',
    sellerRating: 4.9,
    sellerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=pharmacare',
    availability: 'limited',
    tags: ['antibiotic', 'z-pack'],
    rating: 4.7,
    reviews: 203,
    uploadedAt: '2025-06-15',
  },
  {
    id: 'm8',
    name: 'Cetirizine 10mg',
    manufacturer: 'UCB India',
    category: 'Allergy',
    quantity: 10,
    unit: 'tablets',
    manufacturingDate: '2024-01-25',
    expiryDate: '2027-01-25',
    originalPrice: 35,
    sellingPrice: 22,
    description: 'Non-drowsy antihistamine. Long expiry. Great for seasonal allergies.',
    images: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop',
    ],
    sellerId: 'u5',
    sellerName: 'Health First',
    sellerRating: 4.3,
    sellerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=healthfirst',
    availability: 'available',
    tags: ['allergy', 'antihistamine'],
    rating: 4.6,
    reviews: 145,
    uploadedAt: '2025-06-12',
  },
]

export const CATEGORIES = [
  { id: 'all', label: 'All', color: 'blue' },
  { id: 'Pain Relief', label: 'Pain Relief', color: 'red' },
  { id: 'Antibiotics', label: 'Antibiotics', color: 'orange' },
  { id: 'Diabetes', label: 'Diabetes', color: 'emerald' },
  { id: 'Vitamins', label: 'Vitamins', color: 'yellow' },
  { id: 'Allergy', label: 'Allergy', color: 'purple' },
  { id: 'Gastric', label: 'Gastric', color: 'pink' },
  { id: 'Cholesterol', label: 'Cholesterol', color: 'blue' },
]

export const CONVERSATIONS: Conversation[] = [
  {
    id: 'c1',
    participantId: 'u2',
    participantName: 'MedStore Mumbai',
    participantAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=medstore',
    isOnline: true,
    lastMessage: 'Yes, the Paracetamol is still available. I can ship today.',
    lastMessageTime: '2026-07-03T09:30:00',
    unreadCount: 2,
    medicineId: 'm1',
    medicineName: 'Paracetamol 500mg',
    messages: [
      {
        id: 'msg1',
        senderId: '1',
        senderName: 'Me',
        content: 'Hi, is the Paracetamol 500mg still available?',
        timestamp: '2026-07-03T09:25:00',
        seen: true,
        type: 'text',
      },
      {
        id: 'msg2',
        senderId: 'u2',
        senderName: 'MedStore Mumbai',
        content: 'Yes, the Paracetamol is still available. I can ship today.',
        timestamp: '2026-07-03T09:30:00',
        seen: false,
        type: 'text',
      },
      {
        id: 'msg3',
        senderId: 'u2',
        senderName: 'MedStore Mumbai',
        content: 'Would you like to proceed with the purchase?',
        timestamp: '2026-07-03T09:31:00',
        seen: false,
        type: 'text',
      },
    ],
  },
  {
    id: 'c2',
    participantId: 'u3',
    participantName: 'Wellness Hub',
    participantAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wellness',
    isOnline: false,
    lastMessage: 'Great! I\'ll pack it securely for you.',
    lastMessageTime: '2026-07-02T18:45:00',
    unreadCount: 0,
    medicineId: 'm2',
    medicineName: 'Metformin 500mg',
    messages: [
      {
        id: 'msg4',
        senderId: '1',
        senderName: 'Me',
        content: 'Can you please share more details about the Metformin packaging?',
        timestamp: '2026-07-02T18:40:00',
        seen: true,
        type: 'text',
      },
      {
        id: 'msg5',
        senderId: 'u3',
        senderName: 'Wellness Hub',
        content: 'Great! I\'ll pack it securely for you.',
        timestamp: '2026-07-02T18:45:00',
        seen: true,
        type: 'text',
      },
    ],
  },
  {
    id: 'c3',
    participantId: 'u4',
    participantName: 'PharmaCare',
    participantAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=pharmacare',
    isOnline: true,
    lastMessage: 'Sure, I can do ₹80 for 21 capsules.',
    lastMessageTime: '2026-07-03T07:15:00',
    unreadCount: 1,
    medicineId: 'm3',
    medicineName: 'Amoxicillin 250mg',
    messages: [
      {
        id: 'msg6',
        senderId: '1',
        senderName: 'Me',
        content: 'Is there any room for negotiation on the price?',
        timestamp: '2026-07-03T07:10:00',
        seen: true,
        type: 'text',
      },
      {
        id: 'msg7',
        senderId: 'u4',
        senderName: 'PharmaCare',
        content: 'Sure, I can do ₹80 for 21 capsules.',
        timestamp: '2026-07-03T07:15:00',
        seen: false,
        type: 'text',
      },
    ],
  },
]

export const NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    type: 'message',
    title: 'New Message from MedStore Mumbai',
    message: 'Yes, the Paracetamol is still available. I can ship today.',
    timestamp: '2026-07-03T09:30:00',
    isRead: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=medstore',
    actionUrl: '/chat',
  },
  {
    id: 'n2',
    type: 'order',
    title: 'Order Confirmed',
    message: 'Your purchase of Vitamin D3 1000IU has been confirmed by Wellness Hub.',
    timestamp: '2026-07-03T08:00:00',
    isRead: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wellness',
    actionUrl: '/profile',
  },
  {
    id: 'n3',
    type: 'system',
    title: 'Listing Approved',
    message: 'Your Amoxicillin 250mg listing has been approved and is now live on the marketplace.',
    timestamp: '2026-07-02T14:30:00',
    isRead: true,
    actionUrl: '/marketplace',
  },
  {
    id: 'n4',
    type: 'promo',
    title: '🎉 New Seller Bonus!',
    message: 'Complete 5 sales this month and get a featured listing badge. You\'re 3 sales away!',
    timestamp: '2026-07-02T10:00:00',
    isRead: true,
    actionUrl: '/dashboard',
  },
  {
    id: 'n5',
    type: 'message',
    title: 'PharmaCare sent a counter offer',
    message: 'Sure, I can do ₹80 for 21 capsules.',
    timestamp: '2026-07-03T07:15:00',
    isRead: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=pharmacare',
    actionUrl: '/chat',
  },
  {
    id: 'n6',
    type: 'order',
    title: 'Buyer Interested',
    message: 'Someone added your Cetirizine listing to their wishlist.',
    timestamp: '2026-07-01T16:45:00',
    isRead: true,
    actionUrl: '/dashboard',
  },
]

export const DASHBOARD_STATS = {
  totalRevenue: 28540,
  activeListings: 12,
  totalMessages: 47,
  totalSales: 142,
  pendingOrders: 3,
  completedOrders: 139,
  averageRating: 4.8,
  profileViews: 1284,
}

export const REVENUE_DATA = [
  { month: 'Jan', revenue: 1200, sales: 8 },
  { month: 'Feb', revenue: 1800, sales: 12 },
  { month: 'Mar', revenue: 2400, sales: 18 },
  { month: 'Apr', revenue: 2100, sales: 15 },
  { month: 'May', revenue: 3200, sales: 24 },
  { month: 'Jun', revenue: 3800, sales: 29 },
  { month: 'Jul', revenue: 4200, sales: 36 },
]

export const ADMIN_STATS = {
  totalUsers: 3842,
  totalMedicines: 1247,
  totalRevenue: 284500,
  activeChats: 384,
  pendingReports: 12,
  newUsersToday: 47,
}
