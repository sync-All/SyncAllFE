// import React from 'react';
// import { render, fireEvent, screen } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import { BrowserRouter } from 'react-router-dom';
// import UserRole from '../src/components/Auth/Registration/UserRole';


// // Mock useNavigate
// const mockedNavigate = jest.fn();
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: () => mockedNavigate,
// }));

// describe('RegisterUserRole Component', () => {
//   const mockSetSelectedRole = jest.fn();

//   beforeEach(() => {
//     render(
//       <BrowserRouter>
//         <UserRole setSelectedRole={mockSetSelectedRole} />
//       </BrowserRouter>
//     );
//   });

//   it('renders correctly', () => {
//     expect(screen.getByText('Who are you signing up as?')).toBeInTheDocument();
//   });

//   it('navigates and sets role to "Sync User" on click', () => {
//     fireEvent.click(screen.getByText('Sync User'));
//     expect(mockSetSelectedRole).toHaveBeenCalledWith('Sync User');
//     expect(mockedNavigate).toHaveBeenCalledWith('/register2');
//   });

//   it('navigates and sets role to "Music Uploader" on click', () => {
//     fireEvent.click(screen.getByText('Music Uploader'));
//     expect(mockSetSelectedRole).toHaveBeenCalledWith('Music Uploader');
//     expect(mockedNavigate).toHaveBeenCalledWith('/register2');
//   });

//   it('allows role selection via keyboard', () => {
//     fireEvent.keyDown(screen.getByText('Sync User'), {
//       key: 'Enter',
//       code: 'Enter',
//     });
//     expect(mockSetSelectedRole).toHaveBeenCalledWith('Sync User');
//     expect(mockedNavigate).toHaveBeenCalledWith('/register2');
//   });
// });
