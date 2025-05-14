'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     */
    
    // Generate consistent dates for the tutorials
    const createDate = (offsetDays) => {
      const date = new Date();
      date.setDate(date.getDate() - offsetDays);
      return date.toISOString();
    };
    
    // Generate random view count
    const randomViews = () => Math.floor(Math.random() * 1000);
    
    // Generate random likes
    const randomLikes = () => Math.floor(Math.random() * 100);
    
    // Enhanced realistic tutorials data
    const enhancedTutorials = [
      {
        id: uuidv4(),
        title: "Getting Started with React 18",
        description: "Learn the fundamentals of React 18, including new features like Concurrent Rendering, Automatic Batching, and Transitions. This beginner-friendly tutorial takes you through setting up your first React application and building a simple component-based UI with hooks and state management.",
        published: true,
        createdAt: createDate(120),
        updatedAt: createDate(110),
        author: "Sarah Johnson",
        category: "2",
        readTime: 15,
        difficulty: "beginner",
        tags: "react,javascript,frontend,hooks",
        imageUrl: "https://picsum.photos/id/0/600/400",
        viewCount: randomViews(),
        likes: randomLikes()
      },
      {
        id: uuidv4(),
        title: "Building Responsive Layouts with CSS Grid",
        description: "Master CSS Grid layout to create modern, responsive web designs that adapt to any screen size. This tutorial covers grid templates, areas, gaps, and how to combine Grid with Flexbox for powerful layouts. Includes practical examples and common layout patterns you can use in your projects.",
        published: true,
        createdAt: createDate(100),
        updatedAt: createDate(95),
        author: "Alex Chen",
        category: "2",
        readTime: 12,
        difficulty: "intermediate",
        tags: "css,layout,responsive,design",
        imageUrl: "https://picsum.photos/id/1/600/400",
        viewCount: randomViews(),
        likes: randomLikes()
      },
      {
        id: uuidv4(),
        title: "Introduction to TypeScript for JavaScript Developers",
        description: "Transform your JavaScript skills into TypeScript proficiency. Learn how static typing can prevent bugs, improve IDE support, and make your code more maintainable. This tutorial walks through converting a JavaScript project to TypeScript, explaining interfaces, types, generics, and best practices.",
        published: true,
        createdAt: createDate(90),
        updatedAt: createDate(85),
        author: "Michael Rodriguez",
        category: "2",
        readTime: 20,
        difficulty: "intermediate",
        tags: "typescript,javascript,web development",
        imageUrl: "https://picsum.photos/id/2/600/400",
        viewCount: randomViews(),
        likes: randomLikes()
      },
      {
        id: uuidv4(),
        title: "React Native: Build Your First Mobile App",
        description: "Learn to build cross-platform mobile apps with React Native. This comprehensive guide covers setting up your development environment, creating your first app, implementing navigation, and deploying to app stores. Perfect for React developers looking to expand into mobile development.",
        published: true,
        createdAt: createDate(80),
        updatedAt: createDate(75),
        author: "Jessica Williams",
        category: "3",
        readTime: 25,
        difficulty: "intermediate",
        tags: "react-native,mobile,ios,android",
        imageUrl: "https://picsum.photos/id/3/600/400",
        viewCount: randomViews(),
        likes: randomLikes()
      },
      {
        id: uuidv4(),
        title: "Advanced State Management with Redux Toolkit",
        description: "Take your Redux skills to the next level with Redux Toolkit. Learn how RTK simplifies store setup, reduces boilerplate, and improves developer experience. This tutorial covers slices, thunks, selectors, and integration with React for efficient global state management.",
        published: true,
        createdAt: createDate(70),
        updatedAt: createDate(65),
        author: "David Kim",
        category: "1",
        readTime: 18,
        difficulty: "advanced",
        tags: "redux,react,state-management,javascript",
        imageUrl: "https://picsum.photos/id/4/600/400",
        viewCount: randomViews(),
        likes: randomLikes()
      },
      {
        id: uuidv4(),
        title: "Building RESTful APIs with Node.js and Express",
        description: "Learn to create robust, scalable REST APIs using Node.js and Express. This tutorial covers route handling, middleware, authentication, error handling, and database integration. By the end, you'll have built a fully functional API ready for production use.",
        published: true,
        createdAt: createDate(60),
        updatedAt: createDate(55),
        author: "Emily Clark",
        category: "2",
        readTime: 22,
        difficulty: "intermediate",
        tags: "node.js,express,api,backend",
        imageUrl: "https://picsum.photos/id/5/600/400",
        viewCount: randomViews(),
        likes: randomLikes()
      },
      {
        id: uuidv4(),
        title: "Getting Started with Docker for Web Developers",
        description: "Simplify your development workflow with Docker. Learn how to containerize your web applications, set up development environments, and manage multi-container applications with Docker Compose. This practical guide is perfect for developers looking to standardize their development and deployment processes.",
        published: true,
        createdAt: createDate(50),
        updatedAt: createDate(45),
        author: "Robert Martinez",
        category: "5",
        readTime: 15,
        difficulty: "beginner",
        tags: "docker,devops,containers,deployment",
        imageUrl: "https://picsum.photos/id/6/600/400",
        viewCount: randomViews(),
        likes: randomLikes()
      },
      {
        id: uuidv4(),
        title: "Python Data Analysis with Pandas",
        description: "Master data manipulation and analysis in Python using the powerful Pandas library. This tutorial guides you through importing, cleaning, transforming, and visualizing data with practical examples. Perfect for aspiring data scientists and analysts looking to enhance their data processing skills.",
        published: true,
        createdAt: createDate(40),
        updatedAt: createDate(35),
        author: "Sophie Anderson",
        category: "4",
        readTime: 20,
        difficulty: "intermediate",
        tags: "python,pandas,data-analysis,data-science",
        imageUrl: "https://picsum.photos/id/7/600/400",
        viewCount: randomViews(),
        likes: randomLikes()
      },
      {
        id: uuidv4(),
        title: "Introduction to Machine Learning with scikit-learn",
        description: "Begin your journey into machine learning with Python's scikit-learn library. This beginner-friendly tutorial covers fundamental ML concepts, preparing datasets, choosing algorithms, training models, and evaluating performance. No advanced math required—just practical, hands-on examples to get you started.",
        published: true,
        createdAt: createDate(30),
        updatedAt: createDate(25),
        author: "Daniel Wilson",
        category: "4",
        readTime: 30,
        difficulty: "intermediate",
        tags: "machine-learning,python,scikit-learn,ai",
        imageUrl: "https://picsum.photos/id/8/600/400",
        viewCount: randomViews(),
        likes: randomLikes()
      },
      {
        id: uuidv4(),
        title: "Modern CSS Techniques Every Developer Should Know",
        description: "Level up your CSS skills with modern techniques like custom properties, logical properties, container queries, and the new color functions. This tutorial shows how to use these features to create more maintainable, flexible stylesheets that work across browsers.",
        published: true,
        createdAt: createDate(20),
        updatedAt: createDate(15),
        author: "Lisa Brown",
        category: "2",
        readTime: 15,
        difficulty: "intermediate",
        tags: "css,web-design,frontend",
        imageUrl: "https://picsum.photos/id/9/600/400",
        viewCount: randomViews(),
        likes: randomLikes()
      },
      {
        id: uuidv4(),
        title: "Building a Full-Stack JavaScript Application with MERN",
        description: "Create a complete web application using the MERN stack (MongoDB, Express, React, Node.js). This comprehensive tutorial takes you through building both frontend and backend, implementing authentication, state management, and database operations to create a fully functional app.",
        published: true,
        createdAt: createDate(15),
        updatedAt: createDate(10),
        author: "Chris Taylor",
        category: "2",
        readTime: 35,
        difficulty: "advanced",
        tags: "mern,javascript,full-stack,mongodb",
        imageUrl: "https://picsum.photos/id/10/600/400",
        viewCount: randomViews(),
        likes: randomLikes()
      },
      {
        id: uuidv4(),
        title: "Flutter vs React Native: Choosing the Right Mobile Framework",
        description: "Comparing Flutter and React Native to help you choose the best framework for your mobile app project. This detailed comparison covers performance, development experience, community support, and use cases to guide your decision.",
        published: false,
        createdAt: createDate(12),
        updatedAt: createDate(12),
        author: "Natalie Cooper",
        category: "3",
        readTime: 18,
        difficulty: "intermediate",
        tags: "flutter,react-native,mobile-development,comparison",
        imageUrl: "https://picsum.photos/id/11/600/400",
        viewCount: randomViews(),
        likes: randomLikes()
      },
      {
        id: uuidv4(),
        title: "Introduction to AWS for Developers",
        description: "Navigate the AWS ecosystem as a developer with this beginner-friendly guide. Learn about core services like EC2, S3, Lambda, and DynamoDB, and how to use them to deploy scalable applications. Includes practical examples and best practices for cloud architecture.",
        published: false,
        createdAt: createDate(8),
        updatedAt: createDate(8),
        author: "James Miller",
        category: "5",
        readTime: 25,
        difficulty: "beginner",
        tags: "aws,cloud,devops,serverless",
        imageUrl: "https://picsum.photos/id/12/600/400",
        viewCount: randomViews(),
        likes: randomLikes()
      },
      {
        id: uuidv4(),
        title: "Effective Communication Skills for Tech Professionals",
        description: "Enhance your communication skills to advance your tech career. This guide covers technical documentation, presenting complex ideas, active listening, and collaborating effectively with non-technical stakeholders. Perfect for developers looking to improve their soft skills.",
        published: false,
        createdAt: createDate(5),
        updatedAt: createDate(5),
        author: "Rachel Lee",
        category: "7",
        readTime: 12,
        difficulty: "beginner",
        tags: "soft-skills,communication,career,professional-development",
        imageUrl: "https://picsum.photos/id/13/600/400",
        viewCount: randomViews(),
        likes: randomLikes()
      },
      {
        id: uuidv4(),
        title: "Mastering Git and GitHub Workflows",
        description: "Level up your version control skills with advanced Git techniques and GitHub collaboration workflows. Learn branching strategies, rebasing, cherry-picking, and how to manage complex projects with multiple contributors. Ideal for developers working in team environments.",
        published: false,
        createdAt: createDate(3),
        updatedAt: createDate(3),
        author: "Thomas Garcia",
        category: "5",
        readTime: 20,
        difficulty: "advanced",
        tags: "git,github,version-control,collaboration",
        imageUrl: "https://picsum.photos/id/14/600/400",
        viewCount: randomViews(),
        likes: randomLikes()
      },
      {
        id: uuidv4(),
        title: "UI/UX Design Principles for Developers",
        description: "Learn essential design principles that every developer should know. This tutorial covers user-centered design, visual hierarchy, color theory, typography, and accessibility. By understanding these concepts, you can create more intuitive, visually appealing interfaces even without a design background.",
        published: false,
        createdAt: createDate(1),
        updatedAt: createDate(1),
        author: "Olivia White",
        category: "6",
        readTime: 15,
        difficulty: "beginner",
        tags: "ui,ux,design,frontend",
        imageUrl: "https://picsum.photos/id/15/600/400",
        viewCount: randomViews(),
        likes: randomLikes()
      }
    ];
     
    await queryInterface.bulkInsert('tutorials', enhancedTutorials, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete('tutorials', null, {});
  }
};
