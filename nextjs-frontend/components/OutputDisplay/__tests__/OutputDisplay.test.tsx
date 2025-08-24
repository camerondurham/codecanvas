import React from 'react';
import { render, screen } from '@testing-library/react';
import OutputDisplay from '../OutputDisplay';

describe('OutputDisplay', () => {
  it('displays loading state when loading is true', () => {
    render(<OutputDisplay output={null} loading={true} />);
    
    expect(screen.getByText('Executing code...')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('displays output sections when output is provided', () => {
    const mockOutput = {
      stdout: 'Hello, World!',
      stderr: 'Warning: deprecated function',
      error: 'Syntax error on line 5'
    };

    render(<OutputDisplay output={mockOutput} loading={false} />);
    
    expect(screen.getByText('stdout:')).toBeInTheDocument();
    expect(screen.getByText('stderr:')).toBeInTheDocument();
    expect(screen.getByText('error:')).toBeInTheDocument();
    
    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
    expect(screen.getByText('Warning: deprecated function')).toBeInTheDocument();
    expect(screen.getByText('Syntax error on line 5')).toBeInTheDocument();
  });

  it('displays "none" for empty output fields', () => {
    const mockOutput = {
      stdout: '',
      stderr: '',
      error: ''
    };

    render(<OutputDisplay output={mockOutput} loading={false} />);
    
    const noneTexts = screen.getAllByText('none');
    expect(noneTexts).toHaveLength(3);
  });

  it('displays "none" when output is null', () => {
    render(<OutputDisplay output={null} loading={false} />);
    
    const noneTexts = screen.getAllByText('none');
    expect(noneTexts).toHaveLength(3);
  });

  it('preserves formatting in preformatted text elements', () => {
    const mockOutput = {
      stdout: 'Line 1\nLine 2\n  Indented line',
      stderr: '',
      error: ''
    };

    render(<OutputDisplay output={mockOutput} loading={false} />);
    
    const preElement = screen.getByText((content, element) => {
      return element?.tagName === 'PRE' && content.includes('Line 1') && content.includes('Line 2') && content.includes('Indented line');
    });
    expect(preElement.tagName).toBe('PRE');
  });
});