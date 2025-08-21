import React from 'react';
import { render, screen } from '@testing-library/react';
import Layout from '../Layout';

describe('Layout', () => {
  it('should render with default title', () => {
    render(
      <Layout>
        <div>Test content</div>
      </Layout>
    );

    expect(screen.getByRole('heading', { name: 'Code Runner' })).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
    expect(screen.getByText('Code Runner - Execute code in multiple languages')).toBeInTheDocument();
  });

  it('should render with custom title', () => {
    render(
      <Layout title="Custom Title">
        <div>Test content</div>
      </Layout>
    );

    expect(screen.getByRole('heading', { name: 'Custom Title' })).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('should render children content', () => {
    render(
      <Layout>
        <div data-testid="child-1">First child</div>
        <div data-testid="child-2">Second child</div>
      </Layout>
    );

    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
  });

  it('should have proper semantic structure', () => {
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    expect(screen.getByRole('banner')).toBeInTheDocument(); // header
    expect(screen.getByRole('main')).toBeInTheDocument(); // main
    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // footer
  });

  it('should render header with title', () => {
    render(
      <Layout title="Test App">
        <div>Content</div>
      </Layout>
    );

    const header = screen.getByRole('banner');
    expect(header).toContainElement(screen.getByRole('heading', { name: 'Test App' }));
  });

  it('should render footer with description', () => {
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveTextContent('Code Runner - Execute code in multiple languages');
  });

  it('should wrap children in main content area', () => {
    render(
      <Layout>
        <div data-testid="test-content">Test content</div>
      </Layout>
    );

    const main = screen.getByRole('main');
    expect(main).toContainElement(screen.getByTestId('test-content'));
  });

  it('should handle empty children', () => {
    render(<Layout>{null}</Layout>);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('should handle complex children structure', () => {
    render(
      <Layout>
        <section>
          <h2>Section Title</h2>
          <p>Section content</p>
        </section>
        <aside>
          <p>Sidebar content</p>
        </aside>
      </Layout>
    );

    expect(screen.getByRole('heading', { name: 'Section Title' })).toBeInTheDocument();
    expect(screen.getByText('Section content')).toBeInTheDocument();
    expect(screen.getByText('Sidebar content')).toBeInTheDocument();
  });

  it('should apply correct CSS classes', () => {
    const { container } = render(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    const layoutContainer = container.firstChild as HTMLElement;
    expect(layoutContainer).toHaveClass('container');

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('header');

    const title = screen.getByRole('heading');
    expect(title).toHaveClass('title');

    const main = screen.getByRole('main');
    expect(main).toHaveClass('main');

    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('footer');
  });
});