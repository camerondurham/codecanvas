// Code generated by MockGen. DO NOT EDIT.
// Source: ./engine/controller/writerremover/blobwriter.go

// Package mocks is a generated GoMock package.
package mocks

import (
	reflect "reflect"

	gomock "github.com/golang/mock/gomock"
	writerremover "github.com/runner-x/runner-x/engine/controller/writerremover"
)

// MockBlobWriter is a mock of BlobWriter interface.
type MockBlobWriter struct {
	ctrl     *gomock.Controller
	recorder *MockBlobWriterMockRecorder
}

// MockBlobWriterMockRecorder is the mock recorder for MockBlobWriter.
type MockBlobWriterMockRecorder struct {
	mock *MockBlobWriter
}

// NewMockBlobWriter creates a new mock instance.
func NewMockBlobWriter(ctrl *gomock.Controller) *MockBlobWriter {
	mock := &MockBlobWriter{ctrl: ctrl}
	mock.recorder = &MockBlobWriterMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockBlobWriter) EXPECT() *MockBlobWriterMockRecorder {
	return m.recorder
}

// Write mocks base method.
func (m *MockBlobWriter) Write(blob *writerremover.Blob) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Write", blob)
	ret0, _ := ret[0].(error)
	return ret0
}

// Write indicates an expected call of Write.
func (mr *MockBlobWriterMockRecorder) Write(blob interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Write", reflect.TypeOf((*MockBlobWriter)(nil).Write), blob)
}

// MockBlobRemover is a mock of BlobRemover interface.
type MockBlobRemover struct {
	ctrl     *gomock.Controller
	recorder *MockBlobRemoverMockRecorder
}

// MockBlobRemoverMockRecorder is the mock recorder for MockBlobRemover.
type MockBlobRemoverMockRecorder struct {
	mock *MockBlobRemover
}

// NewMockBlobRemover creates a new mock instance.
func NewMockBlobRemover(ctrl *gomock.Controller) *MockBlobRemover {
	mock := &MockBlobRemover{ctrl: ctrl}
	mock.recorder = &MockBlobRemoverMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockBlobRemover) EXPECT() *MockBlobRemoverMockRecorder {
	return m.recorder
}

// Remove mocks base method.
func (m *MockBlobRemover) Remove() error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Remove")
	ret0, _ := ret[0].(error)
	return ret0
}

// Remove indicates an expected call of Remove.
func (mr *MockBlobRemoverMockRecorder) Remove() *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Remove", reflect.TypeOf((*MockBlobRemover)(nil).Remove))
}

// MockBlobWriterRemover is a mock of BlobWriterRemover interface.
type MockBlobWriterRemover struct {
	ctrl     *gomock.Controller
	recorder *MockBlobWriterRemoverMockRecorder
}

// MockBlobWriterRemoverMockRecorder is the mock recorder for MockBlobWriterRemover.
type MockBlobWriterRemoverMockRecorder struct {
	mock *MockBlobWriterRemover
}

// NewMockBlobWriterRemover creates a new mock instance.
func NewMockBlobWriterRemover(ctrl *gomock.Controller) *MockBlobWriterRemover {
	mock := &MockBlobWriterRemover{ctrl: ctrl}
	mock.recorder = &MockBlobWriterRemoverMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockBlobWriterRemover) EXPECT() *MockBlobWriterRemoverMockRecorder {
	return m.recorder
}

// Remove mocks base method.
func (m *MockBlobWriterRemover) Remove() error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Remove")
	ret0, _ := ret[0].(error)
	return ret0
}

// Remove indicates an expected call of Remove.
func (mr *MockBlobWriterRemoverMockRecorder) Remove() *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Remove", reflect.TypeOf((*MockBlobWriterRemover)(nil).Remove))
}

// Write mocks base method.
func (m *MockBlobWriterRemover) Write(blob *writerremover.Blob) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Write", blob)
	ret0, _ := ret[0].(error)
	return ret0
}

// Write indicates an expected call of Write.
func (mr *MockBlobWriterRemoverMockRecorder) Write(blob interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Write", reflect.TypeOf((*MockBlobWriterRemover)(nil).Write), blob)
}