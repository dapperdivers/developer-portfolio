// Mock implementation for useProjects hook
const useProjects = jest.fn(() => [
  {
    name: 'Project 1',
    desc: 'A cool project',
    image: '/project1.jpg',
    github: 'https://github.com/user/project1',
    link: 'https://project1.com',
    stack: ['React', 'Node.js']
  },
  {
    name: 'Project 2',
    desc: 'Another project',
    image: '/project2.jpg',
    github: 'https://github.com/user/project2',
    stack: ['Vue', 'Express']
  }
]);

export default useProjects;